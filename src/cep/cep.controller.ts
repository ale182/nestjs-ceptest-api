import {Body, Controller, Get, Param, Post,} from '@nestjs/common';
import {CepService} from './cep.service';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags,} from '@nestjs/swagger';
import {DistanciaDto} from "./dto/distancia.dto";

@ApiTags('cep')
@Controller()
export class CepController {
    constructor(private readonly cepService: CepService) {
    }

    @ApiOperation({summary: 'Get test'})
    @ApiResponse({status: 200, description: 'Retorna informações do CEP'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('getByCep/:cep')
    @ApiParam({ name: 'cep', type: 'string' })
    async getByCep(@Param('cep') cep): Promise<any[]> {
        return await this.cepService.getByCep(cep);
    }

    @ApiOperation({summary: 'Get test'})
    @ApiResponse({status: 200, description: 'Retorna Distancia (em KM) entre dois CEPs'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('getDistEntreCeps/:cep1/:cep2')
    @ApiParam({ name: 'cep1', type: 'string' })
    @ApiParam({ name: 'cep2', type: 'string' })
    async getDistEntreCeps(@Param('cep1') cep1, @Param('cep2') cep2): Promise<any[]> {
        return await this.cepService.getDistEntreCeps(cep1,cep2);
    }

    @ApiOperation({summary: 'Get test'})
    @ApiResponse({status: 200, description: 'Retorna Distancia (em KM) entre dois CEPs'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiBody({ type: DistanciaDto})
    @Post('getDistancia')
    async getDistancia(@Body() distanciaDto: DistanciaDto): Promise<any[]> {
        return await this.cepService.getDistancia(distanciaDto);
    }
}
