import { Module } from '@nestjs/common';

import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { DatabaseModule } from '../../db/db.module';
import { PhotoRepository } from './photo.repository';
import { photoRepositoryProvider } from './photo.repository.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [PhotoService, PhotoRepository, photoRepositoryProvider],
  exports: [PhotoService],
})
export class PhotoModule {}
