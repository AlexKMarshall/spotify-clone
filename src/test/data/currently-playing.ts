// Fake currently playing store for test purposes
import * as tracksDB from './tracks';
type CurrentlyPlayingStore = {
  trackId: string | null;
};

const currentlyPlayingStore: CurrentlyPlayingStore = { trackId: null };

const set = async (trackId: string | null) => {
  currentlyPlayingStore.trackId = trackId;
  return read();
};

const read = async () => {
  if (!currentlyPlayingStore.trackId) return null;
  return tracksDB.read(currentlyPlayingStore.trackId);
};

const teardown = () => {
  currentlyPlayingStore.trackId = null;
};

export { set, read, teardown };
