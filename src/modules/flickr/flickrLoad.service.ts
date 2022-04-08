import { Injectable, Logger } from '@nestjs/common';
import { Success, Failure } from 'runtypes';
import { interval, mergeMap, map, bindCallback } from 'rxjs';
const request = require('request');

import {
  LoadFlickrObject,
  FlickrObjectsRunType,
  RequestResponse,
  FlickrObject,
} from './types';
import constants from '../../constants';
import { FlickrToPhotoMapperService } from './flickrToPhotoMapper.service';
import { PhotoService } from '../photo/photo.service';
import { CreatePhotoObject } from '../photo/types';

@Injectable()
export class FlickrLoadService {
  private readonly load: LoadFlickrObject = bindCallback<
    string[],
    RequestResponse
  >(request);

  private readonly logger = new Logger(FlickrLoadService.name);

  constructor(
    private readonly flickrToPhotoMapper: FlickrToPhotoMapperService,
    private readonly photoService: PhotoService,
  ) {
    this.loadFlickrObjects();
  }

  parseAndValidateObjects(res: Error | RequestResponse) {
    if (res instanceof Error) {
      this.logger.warn(Error);

      return [];
    }
    const response = JSON.parse(res[2]);

    const validationResult: Success<FlickrObject[]> | Failure =
      FlickrObjectsRunType.validate(response.items);

    if (validationResult.success) {
      return this.flickrToPhotoMapper.mapFlickrItemsToPhoto(
        validationResult.value,
      );
    }

    if (!validationResult.success && 'message' in validationResult) {
      this.logger.warn(validationResult.message);
    }

    return [];
  }

  loadFlickrObjects() {
    return interval(constants.flickr.FLICKR_UPDATE_INTERVAL)
      .pipe(
        mergeMap(() => this.load(constants.flickr.FLICKR_PHOTO_LOAD_LINK)),
        map(this.parseAndValidateObjects.bind(this)),
      )
      .subscribe(
        (data: CreatePhotoObject[]) => this.photoService.createPhotoMass(data),
        this.logger.error,
      );
  }
}
