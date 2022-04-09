import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { FlickrModule } from './flickr/flickr.module';
import { PhotoModule } from './photo/photo.module';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule, DatabaseModule, FlickrModule, PhotoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
