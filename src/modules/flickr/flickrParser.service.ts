import { Injectable, Logger } from '@nestjs/common';
import { Failure, Success } from 'runtypes';

import { FlickrObject, FlickrObjectsRunType, RequestResponse } from './types';
import { FlickrToPhotoMapperService } from './flickrToPhotoMapper.service';

@Injectable()
export class FlickrParserService {
  private readonly logger = new Logger(FlickrToPhotoMapperService.name);

  private validate(items: unknown[]): FlickrObject[] {
    const validationResult: Success<FlickrObject[]> | Failure =
      FlickrObjectsRunType.validate(items);

    if (validationResult.success) {
      return validationResult.value;
    }

    if (!validationResult.success && 'message' in validationResult) {
      this.logger.warn(validationResult.message);
    }

    return [];
  }

  parseAndValidateObjects(res: Error | RequestResponse): FlickrObject[] {
    if (res instanceof Error) {
      this.logger.warn(Error);

      return [];
    }
    const response = JSON.parse(res[2]);

    return this.validate(response.items);
  }
}
