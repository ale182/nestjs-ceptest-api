import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { configService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import {CepModule} from './cep/cep.module'
import {CepService} from "./cep/cep.service";
import {CepController} from "./cep/cep.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CepModule
  ],
  controllers: [AppController,CepController],
  providers: [],
})
export class AppModule {
  //constructor(private readonly connection: Connection) {}
}
