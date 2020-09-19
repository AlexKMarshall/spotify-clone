import { Track } from '../../types/Track';
// Fake currently playing store for test purposes
import * as tracksDB from './tracks';
type CurrentlyPlayingStore = {
  trackId: string | null;
};

const currentlyPlayingStore: CurrentlyPlayingStore = { trackId: null };

const set = async (track: Track | null) => {
  currentlyPlayingStore.trackId = track ? track.id : null;
  if (track) {
    const existingTrack = await tracksDB.read(track.id);
    if (!existingTrack) {
      await tracksDB.create(track);
    }
  }
};

const read = async () => {
  if (!currentlyPlayingStore.trackId) return null;
  return tracksDB.read(currentlyPlayingStore.trackId);
};

const teardown = () => {
  currentlyPlayingStore.trackId = null;
};

export { set, read, teardown };
