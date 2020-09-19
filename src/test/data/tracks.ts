// Fake Track store for test purposes
import { Track } from '../../types/Track';

type TrackStore = {
  [id: string]: Track;
};

const trackStore: TrackStore = {};

const create = async (track: Track) => {
  trackStore[track.id] = track;
  return track;
};

const read = async (id: string) => {
  return trackStore[id];
};

const teardown = async () => {
  for (const key in trackStore) {
    delete trackStore[key];
  }
};

export { create, read, teardown };
