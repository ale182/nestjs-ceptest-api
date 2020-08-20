import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiOptions } from './api.interface';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USER'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      timezone: this.getValue('DATABASE_TZ'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrationsRun: true,
      logging: this.isProduction() ? null : 'all',
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },

      ssl: this.isProduction(),
    };
  }

  public getSecret() {
    return this.getValue('SECRET', true);
  }

  public getApi(): ApiOptions {
    return {
      title: this.getValue('API_TITLE', true),
      description: this.getValue('API_DESCRIPTION', true),
      version: this.getValue('API_VERSION', true),
      welcome: this.getValue('API_WELCOME', true),
    };
  }

}


const configService = new ConfigService(process.env).ensureValues([
  'NODE_ENV',
  'PORT',
  'API_TITLE',
  'API_DESCRIPTION',
  'API_VERSION',
  'API_WELCOME',
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
  'DATABASE_TZ',
  'SECRET',
]);

export { configService };
