import React from 'react';
import { Link } from 'react-router-dom';
import { Artist } from '../types/Artist';

const ArtistLinkList = ({ artists, className }: { artists: Artist[]; className?: string }) => (
  <>
    {artists.map((artist, index, array) => (
      <React.Fragment key={artist.id}>
        <ArtistLink artist={artist} className={className} />
        <ListSeparator index={index} array={array} separator="," />
      </React.Fragment>
    ))}
  </>
);

const ListSeparator = ({ index, array, separator }: { index: number; array: Array<any>; separator: string }) => (
  <>{index < array.length - 1 ? `${separator} ` : null}</>
);

const ArtistLink = ({ artist, className }: { artist: Artist; className?: string }) => (
  <Link to="/" className={className}>
    {artist.name}
  </Link>
);

export default ArtistLinkList;
