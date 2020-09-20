import React from 'react';
import { render, screen } from '../../test/test-utils';
import { buildPlayer } from '../../test/generate';
import * as db from '../../test/data';
import PlayerControls from '../PlayerControls';

it('shows play button when no track currently playing', async () => {
  await db.player.set(buildPlayer({ is_playing: false }));

  await render(<PlayerControls />);

  const playButton = await screen.findByRole('button', { name: /play/i });
  expect(playButton).toBeInTheDocument();
  expect(playButton).toBeEnabled();
});

it('shows pause button when a track is playing', async () => {
  await db.player.set(buildPlayer({ is_playing: true }));

  await render(<PlayerControls />);

  const pauseButton = await screen.findByRole('button', { name: /pause/i });
  expect(pauseButton).toBeInTheDocument();
  expect(pauseButton).toBeEnabled();
});

it('shows play button when player context is null', async () => {
  await db.player.set(null);

  await render(<PlayerControls />);

  const playButton = await screen.findByRole('button', { name: /play/i });
  expect(playButton).toBeInTheDocument();
  expect(playButton).toBeEnabled();
});
