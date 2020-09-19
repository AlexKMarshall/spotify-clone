import React from 'react';
import { render, screen } from '../test/test-utils';
import * as db from '../test/data';
import App from '../App';
import { buildAlbum, buildTrack } from '../test/generate';

it('renders the app', async () => {
  await db.newReleases.set([buildAlbum(), buildAlbum()]);
  await db.currentlyPlaying.set(buildTrack());
  await render(<App />);

  expect(screen.getByRole('link', { name: /your library/i })).toBeInTheDocument();
});
