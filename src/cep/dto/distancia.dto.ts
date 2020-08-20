import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class DistanciaDto {
    @ApiProperty()
    @IsNotEmpty()
    coord1_lat: number;

    @ApiProperty()
    @IsNotEmpty()
    coord1_lon: number;

    @ApiProperty()
    @IsNotEmpty()
    coord2_lat: number;

    @ApiProperty()
    @IsNotEmpty()
    coord2_lon: number;
}
