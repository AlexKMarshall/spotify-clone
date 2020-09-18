import { SimplifiedTrack } from './Track';

export type PlayHistory = {
  track: SimplifiedTrack;
};

export type RecentlyPlayedReponse = {
  items: PlayHistory[];
};
