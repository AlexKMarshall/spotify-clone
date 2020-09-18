import React from 'react';
import { Artist } from '../types/Artist';

const ArtistLinkList = ({ artists }: { artists: Artist[] }) => (
  <>
    {artists.map((artist, index, array) => (
      <React.Fragment key={artist.id}>
        <ArtistLink artist={artist} />
        <ListSeparator index={index} array={array} separator="," />
      </React.Fragment>
    ))}
  </>
);

const ListSeparator = ({ index, array, separator }: { index: number; array: Array<any>; separator: string }) => (
  <>{index < array.length - 1 ? `${separator} ` : null}</>
);

const ArtistLink = ({ artist }: { artist: Artist }) => <a href="/">{artist.name}</a>;

export default ArtistLinkList;
