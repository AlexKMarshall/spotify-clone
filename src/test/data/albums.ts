// Fake albums store for test purposes
import { Album } from '../../types/Album';

type AlbumStore = {
  [id: string]: Album;
};

const albumStore: AlbumStore = {};

const create = async (album: Album) => {
  albumStore[album.id] = album;
  return album;
};

const read = async (id: string) => {
  return albumStore[id];
};

const readAll = async () => Object.values(albumStore);

const teardown = async () => {
  for (const key in albumStore) {
    delete albumStore[key];
  }
};

export { create, read, readAll, teardown };
