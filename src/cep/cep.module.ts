import { Module } from '@nestjs/common';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';

@Module({
  imports: [],
  providers: [CepService],
  controllers: [CepController],
  exports: [CepService],
})
export class CepModule {}
