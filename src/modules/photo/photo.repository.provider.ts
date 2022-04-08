import { Connection } from 'typeorm';
import { PhotoEntity } from '../../db/entities/photo.entity';
import constants from '../../constants';

export const photoRepositoryProvider = {
  provide: constants.provider.PHOTO_REPOSITORY_PROVIDER,
  useFactory: (connection: Connection) => connection.getRepository(PhotoEntity),
  inject: [constants.provider.DATABASE_PROVIDER],
};
