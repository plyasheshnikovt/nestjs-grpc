import { Injectable, Logger } from '@nestjs/common';
import { interval, mergeMap, map, bindCallback } from 'rxjs';
const request = require('request');

import constants from '../../constants';
import { PhotoService } from '../photo/photo.service';
import { CreatePhotoObject } from '../photo/types';
import { FlickrParserService } from './flickrParser.service';
import { LoadFlickrObject, RequestResponse } from './types';
import { FlickrToPhotoMapperService } from './flickrToPhotoMapper.service';

@Injectable()
export class FlickrLoadService {
  private readonly load: LoadFlickrObject = bindCallback<
    string[],
    RequestResponse
  >(request);

  private readonly logger = new Logger(FlickrLoadService.name);

  constructor(
    private readonly flickParser: FlickrParserService,
    private readonly photoService: PhotoService,
    private readonly flickrToPhotoMapper: FlickrToPhotoMapperService,
  ) {
    this.loadFlickrObjects();
  }

  loadFlickrObjects() {
    return interval(constants.flickr.FLICKR_UPDATE_INTERVAL)
      .pipe(
        mergeMap(() => this.load(constants.flickr.FLICKR_PHOTO_LOAD_LINK)),
        map((el) => this.flickParser.parseAndValidateObjects(el)),
        map((el) => this.flickrToPhotoMapper.mapFlickrItemsToPhoto(el)),
      )
      .subscribe(
        (data: CreatePhotoObject[]) => this.photoService.createPhotoMass(data),
        this.logger.error,
      );
  }
}
