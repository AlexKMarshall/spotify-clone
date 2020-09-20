import React from 'react';
import { render, screen, waitFor } from '../../test/test-utils';
import { buildPlayer, buildTrack } from '../../test/generate';
import * as db from '../../test/data';
import PlayerControls from '../PlayerControls';
import { randBetween } from '../../utils/random';

it('shows pause button and track durations when track playing', async () => {
  const fiveMinutesThirty = 5 * 60 * 1000 + 30 * 1000;
  const twentyFiveSeconds = 25 * 1000;
  const track = buildTrack({ duration_ms: fiveMinutesThirty });
  await db.player.set(buildPlayer({ is_playing: true, item: track, progress_ms: twentyFiveSeconds }));

  await render(<PlayerControls />);

  const pauseButton = await screen.findByRole('button', { name: /pause/i });
  expect(pauseButton).toBeInTheDocument();
  expect(pauseButton).toBeEnabled();
  expect(screen.getByLabelText(/current position/i)).toHaveTextContent('0:25');
  expect(screen.getByLabelText(/total duration/i)).toHaveTextContent('5:30');
});

it('shows play button and durations when track is paused', async () => {
  const fiveMinutesThirty = 5 * 60 * 1000 + 30 * 1000;
  const twentyFiveSeconds = 25 * 1000;
  const track = buildTrack({ duration_ms: fiveMinutesThirty });
  await db.player.set(buildPlayer({ is_playing: false, item: track, progress_ms: twentyFiveSeconds }));
  await render(<PlayerControls />);

  const playButton = await screen.findByRole('button', { name: /play/i });
  expect(playButton).toBeInTheDocument();
  expect(playButton).toBeEnabled();
  expect(screen.getByLabelText(/current position/i)).toHaveTextContent('0:25');
  expect(screen.getByLabelText(/total duration/i)).toHaveTextContent('5:30');
});

it('shows play button and zero durations when player context is null', async () => {
  await db.player.set(null);

  await render(<PlayerControls />);

  const playButton = await screen.findByRole('button', { name: /play/i });
  expect(playButton).toBeInTheDocument();
  expect(playButton).toBeEnabled();
  // Have to put this in here because of react query caching between tests
  await waitFor(() => {
    expect(screen.getByLabelText(/current position/i)).toHaveTextContent('0:00');
  });
  expect(screen.getByLabelText(/total duration/i)).toHaveTextContent('0:00');
});
