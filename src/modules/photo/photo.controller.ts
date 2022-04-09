import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GrpcStreamMethod } from '@nestjs/microservices';

import { PhotoService } from './photo.service';
import { GetAllPhotoResponse, GetAllPhotosParams } from './types';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @GrpcStreamMethod('PhotoService')
  GetAll(
    observableParams: Observable<GetAllPhotosParams>,
  ): Observable<GetAllPhotoResponse> {
    return this.photoService.getPhotos(observableParams);
  }
}
