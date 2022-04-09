export interface CreatePhotoObject {
  title: string;
  link: string;
  media: string;
  dateTaken: Date;
  description: string;
  published: Date;
  author: string;
  authorId: string;
  tags: string;
}

export interface PhotoItem {
  id: number;
  title: string;
  link: string;
}

export interface GetAllPhotoResponse {
  items: PhotoItem[];
}

export interface GetAllPhotosParams {
  limit?: number;
  tags?: string;
  ids?: number[];
}
