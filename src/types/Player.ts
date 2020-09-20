import { NullTrack, Track } from './Track';

export type Player = {
  is_playing: boolean;
  progress_ms: number;
  item: Track;
};

export const NullPlayer: Player = {
  is_playing: false,
  progress_ms: 0,
  item: NullTrack,
};
