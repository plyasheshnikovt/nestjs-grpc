import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import constants from '../../constants';
import { PhotoEntity } from '../../db/entities/photo.entity';
import { CreatePhotoObject, GetAllPhotosParams, PhotoItem } from './types';

@Injectable()
export class PhotoRepository {
  constructor(
    @Inject(constants.provider.PHOTO_REPOSITORY_PROVIDER)
    private photoRepository: Repository<PhotoEntity>,
  ) {}

  getAllPhotos({
    limit = 10,
    tags,
    ids,
  }: GetAllPhotosParams): Promise<PhotoItem[]> {
    const query = this.photoRepository
      .createQueryBuilder()
      .select(['id', 'title', 'link'])
      .limit(limit);

    if (tags) {
      query.andWhere(`tags ILIKE '%${tags}%'`);
    }

    if (ids && ids.length) {
      query.andWhere(`id IN (${ids.join(',')})`);
    }

    return query.getRawMany();
  }

  upsert(photos: CreatePhotoObject[]) {
    return this.photoRepository.upsert(photos, {
      conflictPaths: ['link'],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
