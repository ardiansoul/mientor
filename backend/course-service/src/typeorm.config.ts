import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from '@nestjs/config/node_modules/dotenv';

dotenv.config({
  debug: true,
  path: './.development.env',
  override: true,
});

const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
