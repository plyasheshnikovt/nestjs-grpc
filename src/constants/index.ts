export default {
  provider: {
    DATABASE_PROVIDER: 'DATABASE_CONNECTION',
    PHOTO_REPOSITORY_PROVIDER: 'PHOTO_REPOSITORY_PROVIDER',
  },
  flickr: {
    FLICKR_PHOTO_LOAD_LINK:
      'https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json',
    FLICKR_UPDATE_INTERVAL: 15000,
  },
};
