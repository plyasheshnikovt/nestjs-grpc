import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm/data-source/DataSource';

import { AppModule } from './modules/app.module';
import constants from './constants';
import { grpcOptions } from '../grpc.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcOptions);

  const connection = app.get<DataSource>(constants.provider.DATABASE_PROVIDER);

  await connection.runMigrations();

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
