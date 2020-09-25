import React from 'react';
import { buildTrack } from '../../test/generate';
import { render, screen, waitFor } from '../../test/test-utils';
import * as db from '../../test/data';
import NowPlaying from '../NowPlaying';

it('displays the currently playing track if one available', async () => {
  const track = buildTrack();
  await db.currentlyPlaying.set(track);

  await render(<NowPlaying />);

  expect(screen.getByRole('link', { name: track.name })).toBeInTheDocument();
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

  expect(screen.getByRole('link', { name: track.name })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: `${track.album.name} Cover` })).toHaveAttribute(
    'src',
    track.album.images[2].url,
  );
  track.artists.forEach((artist) => {
    expect(screen.getByRole('link', { name: artist.name })).toBeInTheDocument();
  });
});

it('shows saved icon if track is saved', async () => {
  const track = buildTrack();
  await db.currentlyPlaying.set(track);
  await db.savedTracks.set([track.id]);

  await render(<NowPlaying />);

  expect(screen.getByText(/saved/i)).toBeInTheDocument();
});

it('shows un-saved icon if track is not saved', async () => {
  const track = buildTrack();
  db.currentlyPlaying.set(track);

  await render(<NowPlaying />);

  expect(screen.getByText(/not in your library/i)).toBeInTheDocument();
});
