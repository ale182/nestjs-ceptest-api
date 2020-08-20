import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as CepCoords from 'coordenadas-do-cep'
import {DistanciaDto} from "./dto/distancia.dto";

@Injectable()
export class CepService {
    constructor() {
    }

    async getByCep(cep: string): Promise<any> {
        try{
            return await CepCoords.getByCep(cep);
        } catch (err) {
            throw new HttpException(
                { message: err.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getDistEntreCeps(cep1: string , cep2: string): Promise<any> {
        try{
            return await CepCoords.getDistEntreCeps(cep1,cep2);
        } catch (err) {
            throw new HttpException(
                { message: err.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getDistancia(distanciaDto: DistanciaDto): Promise<any> {
        try{
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
                { message: err.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
