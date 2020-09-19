import React from 'react';
import { buildTrack } from '../../test/generate';
import { render, screen } from '../../test/test-utils';
import * as db from '../../test/data';
import NowPlaying from '../NowPlaying';

it('displays the currently playing track if one available', async () => {
  const track = buildTrack();
  db.tracks.create(track);
  db.currentlyPlaying.set(track.id);

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
