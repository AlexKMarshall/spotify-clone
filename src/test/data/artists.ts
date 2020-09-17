// Fake Artists store for test purposes
import { Artist } from '../../types/Artist';

type ArtistStore = {
  [id: string]: Artist;
};

const artistStore: ArtistStore = {};

const create = async (artist: Artist) => {
  artistStore[artist.id] = artist;
  return artist;
};

const read = async (id: string) => {
  // need to handle where id doesn't exist
  return artistStore[id];
};

const teardown = async () => {
  for (const key in artistStore) {
    delete artistStore[key];
  }
};

export { create, read, teardown };
