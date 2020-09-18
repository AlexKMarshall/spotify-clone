import React from 'react';
import { buildAlbum } from '../../test/generate';
import { rtlRender, screen } from '../../test/test-utils';
import { randBetween } from '../../utils/random';
import faker from 'faker';
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

it('should not render a see all link if all albums already displayed', () => {
  const albums = [buildAlbum()];
  const heading = faker.lorem.words(2);

  const normalSizeWrapper: React.FC = ({ children }) => <div style={{ width: '1000px' }}>{children}</div>;

  rtlRender(<AlbumList albums={albums} heading={heading} />, { wrapper: normalSizeWrapper });

  expect(screen.queryByRole('link', { name: /see all/i })).not.toBeInTheDocument();
});

it('should render a see all link if there are more albums than fit on screen', () => {
  const albums = Array(10)
    .fill(0)
    .map(() => buildAlbum());
  const heading = faker.lorem.words(2);

  const normalSizeWrapper: React.FC = ({ children }) => <div style={{ width: '1000px' }}>{children}</div>;

  rtlRender(<AlbumList albums={albums} heading={heading} />, { wrapper: normalSizeWrapper });

  expect(screen.getByRole('link', { name: /see all/i })).toBeInTheDocument();
});
