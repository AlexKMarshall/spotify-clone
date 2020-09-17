import React from 'react';
import { Album } from '../types/Album';
import { Artist } from '../types/Artist';

type PropTypes = {
  heading: string;
  albums: Album[];
};

const AlbumList = ({ heading, albums }: PropTypes) => {
  return (
    <section className="mt-6">
      <header className="flex items-center justify-between">
        <a href="/">
          <h2 className="text-2xl font-bold text-white hover:underline">{heading}</h2>
        </a>
        <a href="/" className="text-xs font-bold tracking-wider uppercase hover:underline">
          See All
        </a>
      </header>
      <div
        className="grid grid-rows-1 mt-3 overflow-y-hidden gap-x-3 grid-cols-album-cards"
        style={{ gridAutoRows: '0px' }}
      >
        {albums.map((album) => (
          <AlbumCard key={album.id} {...album} />
        ))}
      </div>
    </section>
  );
};

const AlbumCard = ({ id: albumId, name, images, artists }: Album) => (
  <div className="relative p-5 rounded-md bg-spotify-gray-600 group">
    <a href="/">
      <img src={images[1].url} alt={`${name} Cover`} />
    </a>
    <a href="/">
      <h3 className="mt-4 overflow-x-hidden text-base font-bold tracking-wide text-white whitespace-no-wrap">{name}</h3>
    </a>
    <div>
      {artists.map((artist) => (
        <React.Fragment key={`${albumId}-${artist.id}`}>
          <ArtistLink artist={artist} />{' '}
        </React.Fragment>
      ))}
    </div>
    <button className="absolute bottom-0 right-0 flex items-center justify-center invisible w-10 h-10 mb-5 mr-5 rounded-full bg-spotify-green group-hover:visible">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
);

const ArtistLink = ({ artist }: { artist: Artist }) => (
  <a href="/" className="text-xs hover:underline">
    {artist.name}
  </a>
);

export default AlbumList;
