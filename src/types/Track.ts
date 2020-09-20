import { Album, NullAlbum } from './Album';
import { Artist } from './Artist';

export type Track = {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
  duration_ms: number;
};

export const NullTrack = {
  album: NullAlbum,
  artists: [],
  id: '',
  name: '',
  duration_ms: 0,
};

export type SimplifiedTrack = Exclude<Track, 'album'>;
