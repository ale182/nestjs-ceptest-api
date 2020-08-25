import { Module } from '@nestjs/common';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import {configService} from "../config/config.service";
import {CepEntity} from "./cep.entity";
import {DneLogradouroEntity} from "./dneLogradouro.entity";
import {DneLocalidadeEntity} from "./dneLocalidade.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CepEntity,DneLogradouroEntity,DneLocalidadeEntity], configService.getTypeOrmConfig().name)],
  providers: [CepService],
  controllers: [CepController],
  exports: [CepService],
})
export class CepModule {}
