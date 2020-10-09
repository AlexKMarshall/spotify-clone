import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../types/Album';
import { useResizeObserver } from '../utils/hooks';
import ArtistLinkList from './ArtistLinkList';

type PropTypes = {
  heading: string;
  albums: Album[];
};

const useGridColumnCount = (gridRef: React.RefObject<HTMLDivElement>) => {
  // This will only work for changing the size of the grid and the content
  // not changing. If children are added and removed, this won't update

  const { width } = useResizeObserver(gridRef);
  const [colCount, setColCount] = useState(0);

  useEffect(() => {
    if (gridRef.current) {
      const gtlStyle = window.getComputedStyle(gridRef.current).gridTemplateColumns;
      setColCount(gtlStyle.split(' ').length);
    }
  }, [gridRef, width]);

  return colCount;
};

const AlbumList = ({ heading, albums }: PropTypes) => {
  const gridEl = useRef<HTMLDivElement>(null);
  const gridColumnCount = useGridColumnCount(gridEl);
  const albumCount = albums.length;
  const isMoreToShow = albumCount > gridColumnCount;

  return (
    <section className="mt-6">
      <header className="flex items-center justify-between">
        <Link to="/">
          <h2 className="text-2xl font-bold text-white hover:underline">{heading}</h2>
        </Link>
        {isMoreToShow ? <SeeAllLink /> : null}
      </header>
      <div
        className="grid grid-rows-1 mt-3 overflow-y-hidden gap-x-3 grid-cols-album-cards"
        style={{ gridAutoRows: '0px' }}
        ref={gridEl}
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
    <Link to="/">
      <img src={images[1].url} alt={`${name} Cover`} />
    </Link>
    <Link to="/">
      <h3 className="mt-4 overflow-x-hidden text-base font-bold tracking-wide text-white whitespace-no-wrap">{name}</h3>
    </Link>
    <div>
      <ArtistLinkList artists={artists} className="text-xs hover:underline" />
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

const SeeAllLink = () => (
  <Link to="/" className="text-xs font-bold tracking-wider uppercase hover:underline">
    See All
  </Link>
);

export default AlbumList;
