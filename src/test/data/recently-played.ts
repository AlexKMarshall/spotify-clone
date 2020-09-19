import { PlayHistory } from '../../types/PlayHistory';
import { Track } from '../../types/Track';
// Fake recently played store for test purposes
import * as tracksDb from './tracks';

type RecentlyPlayedStore = {
  trackIds: string[];
};

const store: RecentlyPlayedStore = {
  trackIds: [],
};

const set = async (tracks: Track[]) => {
  store.trackIds = tracks.map((track) => track.id);
  tracks.forEach(async (track) => {
    const existingTrack = await tracksDb.read(track.id);
    if (!existingTrack) {
      await tracksDb.create(track);
    }
  });
};

const read = async (): Promise<PlayHistory[]> => {
  const tracks = await Promise.all(store.trackIds.map(tracksDb.read));
  return tracks.map((track) => ({ track }));
};

const teardown = () => {
  store.trackIds = [];
};

export { set, read, teardown };
