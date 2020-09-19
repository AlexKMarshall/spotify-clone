import { PlayHistory } from '../../types/PlayHistory';
// Fake recently played store for test purposes
import * as tracksDb from './tracks';

type RecentlyPlayedStore = {
  trackIds: string[];
};

const store: RecentlyPlayedStore = {
  trackIds: [],
};

const set = async (trackIds: string[]) => {
  store.trackIds = trackIds;
  return read();
};

const read = async (): Promise<PlayHistory[]> => {
  const tracks = await Promise.all(store.trackIds.map(tracksDb.read));
  return tracks.map((track) => ({ track }));
};

const teardown = () => {
  store.trackIds = [];
};

export { set, read, teardown };
