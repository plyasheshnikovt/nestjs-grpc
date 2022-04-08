import { Module } from '@nestjs/common';
import { databaseProvider } from './db.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
  imports: [ConfigModule.forRoot()],
})
export class DatabaseModule {}
