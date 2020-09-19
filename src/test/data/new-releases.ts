// Fake new releases store for test purposes
import { Album } from '../../types/Album';
import * as albumsDb from './albums';

type NewReleasesStore = {
  albumIds: string[];
};

const store: NewReleasesStore = {
  albumIds: [],
};

const set = async (albums: Album[]) => {
  store.albumIds = albums.map((album) => album.id);
  // console.log(albums);
  albums.forEach(async (album) => {
    const existingAlbum = await albumsDb.read(album.id);
    if (!existingAlbum) {
      await albumsDb.create(album);
    }
  });
};

const read = async (): Promise<Album[]> => {
  return Promise.all(store.albumIds.map(albumsDb.read));
};

const teardown = () => {
  store.albumIds = [];
};

export { set, read, teardown };
