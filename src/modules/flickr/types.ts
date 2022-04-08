import { Record, Array, String, Static } from 'runtypes';
import { Observable } from 'rxjs';

export const FlickrObjectRunType = Record({
  title: String,
  link: String,
  media: Record({ m: String }),
  date_taken: String,
  description: String,
  published: String,
  author: String,
  author_id: String,
  tags: String,
});

export const FlickrObjectsRunType = Array(FlickrObjectRunType);

export type FlickrObject = Static<typeof FlickrObjectRunType>;

export type RequestResponse = [null, { body: string }, string];

export type LoadFlickrObject = (
  url: string,
) => Observable<Error | RequestResponse>;
