import { NullTrack, Track } from './Track';

export type Player = {
  is_playing: boolean;
  progress_ms: number;
  item: Track;
  actions: {
    disallows: Disallows;
  };
};

type Disallows = Partial<Record<PlayerAction, boolean>>;

type PlayerAction =
  | 'pausing'
  | 'resuming'
  | 'seeking'
  | 'skipping_next'
  | 'skipping_prev'
  | 'toggling_shuffle'
  | 'toggling_repeat_context'
  | 'toggling_repeat_track';

export const NullPlayer: Player = {
  is_playing: false,
  progress_ms: 0,
  item: NullTrack,
  actions: {
    disallows: {
      skipping_prev: true,
      skipping_next: true,
    },
  },
};
