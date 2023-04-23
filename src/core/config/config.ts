import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { DataSourceOptions } from 'typeorm';

import { ENTITIES, SUBSCRIBERS } from '@entities/index';
import { EnvironmentType } from '@models/enum';

import { ISwaggerOptions } from './models';

export class Config {
  private readonly _path: string = 'environments/.env';
  private readonly _env: Record<string, any> = process.env;
  private static _instance: Config;

  private constructor() {
    if (!existsSync(this._path)) {
      Logger.warn(`File '${this._path}' does not exists.`, Config.name);

      return;
    }

    config({ path: this._path });
  }

  static get get(): Config {
    if (!this._instance) {
      this._instance = new Config();
    }

    return this._instance;
  }

  get port(): number {
    return +this._env.PORT || 3000;
  }

  get swaggerOptions(): ISwaggerOptions {
    return {
      title: this._env.SWAGGER_TITLE,
      url: this._env.SWAGGER_URL,
    };
  }

  get clientURL(): string {
    return this._env.CLIENT_URL;
  }

  get environment(): EnvironmentType {
    return this._env.NODE_ENV as EnvironmentType;
  }

  get hashSalt(): string {
    return this._env.HASH_SALT;
  }

  get emailPass(): string {
    return this._env.EMAIL_PASSWORD;
  }

  get keyPem(): string {
    return readFileSync(resolve(__dirname, '../'.repeat(4), 'keys/key.pem'), 'utf-8');
  }

  get keyPub(): string {
    return readFileSync(resolve(__dirname, '../'.repeat(4), 'keys/key.pub'), 'utf-8');
  }

  get isDevelopment(): boolean {
    return this.environment === EnvironmentType.Development;
  }

  get isProduction(): boolean {
    return this.environment === EnvironmentType.Development;
  }

  get typeORMOptions(): DataSourceOptions {
    return {
      type: this._env.DB_TYPE,
      host: this._env.DB_HOST,
      port: +this._env.DB_PORT,
      database: this._env.DB_NAME,
      username: this._env.DB_USER,
      password: this._env.DB_PASSWORD,
      migrations: [join('../'.repeat(3), 'migrations/*-Migration{.ts,.js}')],
      synchronize: false,
      entities: ENTITIES,
      subscribers: SUBSCRIBERS,
      migrationsRun: false,
      logging: true,
      logger: 'advanced-console',
      migrationsTableName: 'Migrations',
    };
  }
}
