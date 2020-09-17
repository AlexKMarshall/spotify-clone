import { Artist } from './Artist';

export type Album = {
  id: string;
  name: string;
  images: AlbumImage[];
  artists: Artist[];
};

type AlbumImage = {
  height: number;
  url: string;
  width: number;
};

export type AlbumList = {
  items: Album[];
};

export type AlbumListResponse = {
  albums: AlbumList;
};
