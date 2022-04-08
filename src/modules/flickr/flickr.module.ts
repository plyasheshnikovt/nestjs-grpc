import { Module } from '@nestjs/common';

import { FlickrLoadService } from './flickrLoad.service';
import { FlickrToPhotoMapperService } from './flickrToPhotoMapper.service';
import { LoggerModule } from '../logger/logger.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [LoggerModule, PhotoModule],
  controllers: [],
  providers: [FlickrLoadService, FlickrToPhotoMapperService],
})
export class FlickrModule {}
