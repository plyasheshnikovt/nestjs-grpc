import { Injectable } from '@nestjs/common';
import { Subject, Observable, from, switchMap, map, merge } from 'rxjs';

import {
  CreatePhotoObject,
  GetAllPhotoResponse,
  GetAllPhotosParams,
} from './types';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(private photoRepository: PhotoRepository) {}

  private readonly newPhotoIdsObservable = new Subject<number[]>();

  private getAllPhotosObservable(
    params: GetAllPhotosParams,
  ): Observable<GetAllPhotoResponse> {
    return from(this.photoRepository.getAllPhotos(params)).pipe(
      map((data) => ({
        items: data,
      })),
    );
  }

  private getLastPhotosObservable({
    tags,
  }: GetAllPhotosParams): Observable<GetAllPhotoResponse> {
    return this.newPhotoIdsObservable.pipe(
      switchMap((ids) => this.getAllPhotosObservable({ tags, ids })),
    );
  }

  getPhotos(
    observableParams: Observable<GetAllPhotosParams>,
  ): Observable<GetAllPhotoResponse> {
    return observableParams.pipe(
      switchMap((params: GetAllPhotosParams) =>
        merge(
          this.getAllPhotosObservable(params),
          this.getLastPhotosObservable(params),
        ),
      ),
    );
  }

  createPhotoMass(photos: CreatePhotoObject[]) {
    return from(this.photoRepository.upsert(photos)).subscribe(
      ({ identifiers }) => {
        this.newPhotoIdsObservable.next(
          identifiers.filter((el) => el).map((el) => el.id),
        );
      },
    );
  }
}
