import { Module } from '@nestjs/common';
import { databaseProvider } from './db.provider';

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
  imports: [],
})
export class DatabaseModule {}
