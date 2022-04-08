import { Injectable } from '@nestjs/common';
import { CreatePhotoObject, GetAllPhotosParams } from './types';
import { Subject, Observable, from, switchMap, map, merge } from 'rxjs';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(private photoRepository: PhotoRepository) {}

  private readonly newPhotoIdsObservable = new Subject<number[]>();

  async createPhotoMass(photos: CreatePhotoObject[]) {
    return from(this.photoRepository.upsert(photos)).subscribe(
      ({ identifiers }) => {
        this.newPhotoIdsObservable.next(
          identifiers.filter((el) => el).map((el) => el.id),
        );
      },
    );
  }

  getAllPhotosObservable(params: GetAllPhotosParams) {
    return from(this.photoRepository.getAllPhotos(params)).pipe(
      map((data) => ({
        items: data,
      })),
    );
  }

  getLastPhotosObservable(params: GetAllPhotosParams) {
    return this.newPhotoIdsObservable.pipe(
      switchMap((ids) => this.getAllPhotosObservable({ ...params, ids })),
    );
  }

  getPhotos(data$: Observable<GetAllPhotosParams>) {
    return data$.pipe(
      switchMap((params: GetAllPhotosParams) =>
        merge(
          this.getAllPhotosObservable(params),
          this.getLastPhotosObservable(params),
        ),
      ),
    );
  }
}
