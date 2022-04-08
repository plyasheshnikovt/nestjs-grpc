import { Injectable } from '@nestjs/common';
import { FlickrObject } from 'src/modules/flickr/types';
import { CreatePhotoObject } from 'src/modules/photo/types';

@Injectable()
export class FlickrToPhotoMapperService {
  mapFlickrItemsToPhoto(items: FlickrObject[]): CreatePhotoObject[] {
    return items.map(
      ({
        title,
        author_id,
        author,
        description,
        link,
        media,
        tags,
        published,
        date_taken,
      }) => ({
        title,
        author,
        authorId: author_id,
        dateTaken: new Date(date_taken),
        description,
        link,
        media: media.m,
        tags,
        published: new Date(published),
      }),
    );
  }
}
