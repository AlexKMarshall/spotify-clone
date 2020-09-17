import React from 'react';
import { buildAlbum } from '../../test/generate';
import { rtlRender, screen } from '../../test/test-utils';
import { randBetween } from '../../utils/random';
import AlbumList from '../AlbumList';

it('should render list of albums cards with heading', () => {
  const heading = 'My Albums';
  const albums = Array(randBetween([1, 5]))
    .fill(0)
    .map(() => buildAlbum());
  rtlRender(<AlbumList heading={heading} albums={albums} />);

  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();

  albums.forEach((album) => {
    expect(screen.getByRole('heading', { name: album.name })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: `${album.name} Cover` })).toHaveAttribute('src', album.images[0].url);
    album.artists.forEach((artist) => {
      expect(screen.getByRole('link', { name: artist.name })).toBeInTheDocument();
    });
  });
});
