import { Album } from './Album';
import { Artist } from './Artist';

export type Track = {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
  href: string;
};

export type SimplifiedTrack = Exclude<Track, 'album'>;