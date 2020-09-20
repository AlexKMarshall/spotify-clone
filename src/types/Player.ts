export type Player = {
  is_playing: boolean;
  progress_ms: number;
};

export const NullPlayer: Player = {
  is_playing: false,
  progress_ms: 0,
};
