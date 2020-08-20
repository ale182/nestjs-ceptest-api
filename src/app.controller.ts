import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { configService } from './config/config.service';

@ApiTags('Ping')
@Controller()
export class AppController {
  @Get('ping')
  root(): string {
    return configService.getApi().welcome;
  }
}
