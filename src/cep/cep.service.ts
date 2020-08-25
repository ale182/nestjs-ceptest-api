import {HttpException, HttpStatus, Injectable, OnModuleInit} from '@nestjs/common';
import * as CepCoords from 'coordenadas-do-cep'
import {DistanciaDto} from "./dto/distancia.dto";
import {configService} from "../config/config.service";
import {CepEntity} from "./cep.entity";
import {DneLogradouroEntity} from "./dneLogradouro.entity";
import {DneLocalidadeEntity} from "./dneLocalidade.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm/index";
import axios from 'axios'

@Injectable()
export class CepService implements OnModuleInit {
    constructor(
        @InjectRepository(CepEntity, configService.getTypeOrmConfig().name)
        private readonly cepRepository: Repository<CepEntity>,
        @InjectRepository(DneLogradouroEntity, configService.getTypeOrmConfig().name)
        private readonly dneLogradouroRepository: Repository<DneLogradouroEntity>,
        @InjectRepository(DneLocalidadeEntity, configService.getTypeOrmConfig().name)
        private readonly dneLocalidadeRepository: Repository<DneLocalidadeEntity>,
    ) {
    }

    onModuleInit() {
        console.log(`The module has been initialized.`)
        this.updateCoordenadasGoogle()
    }

    async findAll(): Promise<CepEntity[]> {
        return await this.cepRepository.find();
    }


    async updateCoordenadas() {
        const ceps = await this.cepRepository.find({
            take: 1000,
            where: {
                executed: !(true)
            }
        })

        for (const idx of Object.keys(ceps)) {
            ceps[idx].executed = true
            await this.cepRepository.save(ceps[idx])

            console.log(idx)
            //console.log(ceps[idx])
            try {
                const infocep = await CepCoords.getByCep(("0000000" + ceps[idx].postalcode).slice(-8));
                const cepUpdated = {...ceps[idx], ...infocep}
                //console.log(cepUpdated)
                await this.cepRepository.save(cepUpdated)

            } catch (err) {
                console.log(err)

            }
            const delay = seconds => new Promise(executor => setTimeout(executor, seconds * 1000));
            await delay(1)
        }

        return null
    }

    async updateCoordenadasCEPAberto() {

        const ceps = await this.cepRepository.find({
            take: 15,
            where: {
                executed: !(true),

            }
        })


        for (const idx of Object.keys(ceps)) {
            console.log(ceps[idx].postalcode)
            const cepFormated = ("0000000" + ceps[idx].postalcode).slice(-8)
            console.log(cepFormated)
            const url = `https://www.cepaberto.com/api/v3/cep?cep=${cepFormated}`
            console.log(url)

            await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token token=<TOKEN>"
                },
                url: url
            }).then((res) => {
                    console.log('OK')
                    console.log(res.data);
                }
            ).catch(
                error => {
                    console.log('error')
                    console.log(error)
                },
            );

            const delay = seconds => new Promise(executor => setTimeout(executor, seconds * 1000));
            await delay(1)
            /*
            ceps[idx].executed = true
            await this.cepRepository.save(ceps[idx])

            console.log(idx)
            //console.log(ceps[idx])
            try {
                const infocep = await CepCoords.getByCep();
                const cepUpdated = {...ceps[idx], ...infocep}
                //console.log(cepUpdated)
                await this.cepRepository.save(cepUpdated)

            } catch (err) {
                console.log(err)

            }

             */
        }

        return null
    }

    async updateCoordenadasGoogle() {
        let contador = 0, contadorReq = 0, contadorSucess = 0
        var parseString = require('xml2js').parseString;

        const ceps = await this.cepRepository.find({
            take: 10000,
            where: {
                executed: !(true),

            }
        })


        for (const idx of Object.keys(ceps)) {
            contador++
            ceps[idx].executed = true
            //await this.cepRepository.save(ceps[idx])

            console.log(ceps[idx].postalcode)
            const cepFormated = ("0000000" + ceps[idx].postalcode.replace('-', '')).slice(-8)
            console.log(cepFormated)

            let dneLog, dneLoc
            dneLog = await this.dneLogradouroRepository.findOne({
                where: {
                    CEP: cepFormated
                }
            })

            if (dneLog === undefined) {
                dneLoc = await this.dneLocalidadeRepository.findOne({
                    where: {
                        CEP: cepFormated
                    }
                })
            }

            if ((dneLog !== undefined) || (dneLoc !== undefined) || ceps[idx].postalcode.replace('-', '').length <= 8) {
                const url = `https://maps.googleapis.com/maps/api/geocode/xml?address=${cepFormated}&key=<API_KEY>`
                contadorReq++
                console.log(url)

                await axios({
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    url: url
                }).then((res) => {
                        parseString(res.data, (err, result) => {

                            console.log(result.GeocodeResponse.status[0])
                            const cepUpdated = ceps[idx]
                            cepUpdated.dne = true
                            if (result.GeocodeResponse.status[0] == 'OK') {
                                cepUpdated.responseXML = res.data
                                cepUpdated.responseJSON = JSON.stringify(result)
                                cepUpdated.lat = result.GeocodeResponse.result[0].geometry[0].location[0].lat[0]
                                cepUpdated.lon = result.GeocodeResponse.result[0].geometry[0].location[0].lng[0]
                            }
                            this.cepRepository.save(cepUpdated)
                            contadorSucess++
                        });

                    }
                ).catch(
                    error => {
                        console.log(error)
                        ceps[idx].dne = false
                        this.cepRepository.save(ceps[idx])
                    },
                );

            } else {
                console.log('nao achou DNE')
                ceps[idx].dne = false
                await this.cepRepository.save(ceps[idx])
            }

            console.log(`registros: ${contador}`)
            console.log(`sucesso: ${contadorSucess}`)
            console.log(`Requisicoes: ${contadorReq}`)

        }

        return null
    }

    async getByCep(cep: string): Promise<any> {
        try {
            return await CepCoords.getByCep(cep);
        } catch (err) {
            throw new HttpException(
                {message: err.message},
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getDistEntreCeps(cep1: string, cep2: string): Promise<any> {
        try {
            return await CepCoords.getDistEntreCeps(cep1, cep2);
        } catch (err) {
            throw new HttpException(
                {message: err.message},
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getDistancia(distanciaDto: DistanciaDto): Promise<any> {
        try {
            const coord1 = {
                lat: distanciaDto.coord1_lat,
                lon: distanciaDto.coord1_lon
            };

            const coord2 = {
                lat: distanciaDto.coord2_lat,
                lon: distanciaDto.coord2_lon
            };

            return await CepCoords.getDistancia(coord1, coord2);

        } catch (err) {
            throw new HttpException(
                {message: err.message},
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
