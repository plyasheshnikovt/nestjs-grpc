import { Module } from '@nestjs/common';

import { FlickrLoadService } from './flickrLoad.service';
import { FlickrToPhotoMapperService } from './flickrToPhotoMapper.service';
import { FlickrParserService } from './flickrParser.service';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [PhotoModule],
  controllers: [],
  providers: [
    FlickrLoadService,
    FlickrToPhotoMapperService,
    FlickrParserService,
  ],
})
export class FlickrModule {}
