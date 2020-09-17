import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { buildAlbum, buildUser } from './generate';
import * as usersDB from './data/users';
import * as artistsDB from './data/artists';
import * as albumsDB from './data/albums';
import AppProviders from '../context';
import { User } from '../types/User';
import { Album } from '../types/Album';
import { Artist } from '../types/Artist';

type RenderOptions = {
  user?: User;
  albums?: Album[];
  artists?: Artist[];
};

const render = async (
  ui: React.ReactElement,
  { user, albums, artists, ...renderOptions }: RenderOptions & RtlRenderOptions = {},
) => {
  // if you want to render the app unauthenticated, pass "null" as the user
  user = typeof user === 'undefined' ? await loginAsUser() : user;
  // if you want to render empty collections, pass an empty array as collection value
  if (albums === undefined) albums = await populateAlbumsDB(generateAlbums());
  if (artists === undefined) artists = await populateArtistsDB(getArtistsFromAlbums(albums));

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
      ...renderOptions,
    }),
    user,
    albums,
    artists,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

const loginAsUser = async (userProperties?: Partial<User>) => {
  const user = buildUser(userProperties);
  const authUser = await usersDB.create(user);
  window.location.hash = `access_token=${authUser.token}&token_type=Bearer&expires_in=3600`;
  return authUser;
};

const generateAlbums = (count = 20) => {
  return Array(count)
    .fill(0)
    .map(() => buildAlbum());
};

const populateAlbumsDB = async (albums: Album[]) => {
  const savedAlbums = await Promise.all(albums.map(albumsDB.create));
  return savedAlbums;
};

const getArtistsFromAlbums = (albums: Album[]) => {
  const albumArtists = Array.from(
    albums.reduce((collectedArtists, album) => {
      album.artists.forEach((artist) => {
        collectedArtists.add(artist);
      });
      return collectedArtists;
    }, new Set<Artist>()),
  );

  return albumArtists;
};

const populateArtistsDB = async (artists: Artist[]) => {
  const savedArtists = await Promise.all(artists.map(artistsDB.create));
  return savedArtists;
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)]);

export * from '@testing-library/react';
export { render, rtlRender, waitForLoadingToFinish };
