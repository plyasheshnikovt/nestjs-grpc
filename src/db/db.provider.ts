import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import constants from '../constants';

export const databaseProvider = {
  provide: constants.provider.DATABASE_PROVIDER,
  useFactory: async (configService: ConfigService) =>
    createConnection({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      migrations: [`${__dirname}/migrations/*`],
      entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
      synchronize: false,
    }),
  inject: [ConfigService],
};
