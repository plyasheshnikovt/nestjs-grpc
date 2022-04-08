import { Controller } from '@nestjs/common';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { PhotoService } from './photo.service';
import { Observable } from 'rxjs';
import { GetAllPhotosParams } from './types';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @GrpcStreamMethod('PhotoService')
  GetAll(params: Observable<GetAllPhotosParams>) {
    return this.photoService.getPhotos(params);
  }
}
