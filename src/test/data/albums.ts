import { artists } from '.';
// Fake albums store for test purposes
import { Album } from '../../types/Album';
import * as artistsDb from './artists';

type AlbumStore = {
  [id: string]: Album;
};

const albumStore: AlbumStore = {};

const create = async (album: Album) => {
  albumStore[album.id] = album;
  album.artists.forEach(async (artist) => {
    const foundArtist = await artistsDb.read(artist.id);
    if (!foundArtist) {
      artistsDb.create(artist);
    }
  });
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
