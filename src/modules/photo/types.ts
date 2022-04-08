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

export interface GetAllPhotoResponse {
  id: number;
  title: string;
  link: string;
}

export interface GetAllPhotosParams {
  limit?: number;
  tags?: string;
  ids?: number[];
}
