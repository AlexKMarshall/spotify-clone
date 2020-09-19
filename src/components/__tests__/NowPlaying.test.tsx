import React from 'react';
import { buildTrack } from '../../test/generate';
import { render, screen, waitFor } from '../../test/test-utils';
import * as db from '../../test/data';
import NowPlaying from '../NowPlaying';

it('displays the currently playing track if one available', async () => {
  const track = buildTrack();
  await db.currentlyPlaying.set(track);

  await render(<NowPlaying />);

  // The react query cache seems to be persisting between tests, so we wait for the query to settle
  await waitFor(() => expect(screen.getByRole('link', { name: track.name })).toBeInTheDocument());
  expect(screen.getByRole('img', { name: `${track.album.name} Cover` })).toHaveAttribute(
    'src',
    track.album.images[2].url,
  );
  track.artists.forEach((artist) => {
    expect(screen.getByRole('link', { name: artist.name })).toBeInTheDocument();
  });
});

it('displays the last played track if no track currently playing', async () => {
  const track = buildTrack();
  await db.currentlyPlaying.set(null);
  db.recentlyPlayed.set([track]);

  await render(<NowPlaying />);

  // The react query cache seems to be persisting between tests, so we wait for the query to settle
  await waitFor(() => expect(screen.getByRole('link', { name: track.name })).toBeInTheDocument());
  expect(screen.getByRole('link', { name: track.name })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: `${track.album.name} Cover` })).toHaveAttribute(
    'src',
    track.album.images[2].url,
  );
  track.artists.forEach((artist) => {
    expect(screen.getByRole('link', { name: artist.name })).toBeInTheDocument();
  });
});
