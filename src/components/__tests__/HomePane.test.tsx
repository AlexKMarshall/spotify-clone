import React from 'react';
import { render, screen } from '../../test/test-utils';
import { buildAlbum } from '../../test/generate';
import * as db from '../../test/data';
import HomePane from '../HomePane';

it('should render new releases', async () => {
  const newReleases = [buildAlbum(), buildAlbum()];
  await db.newReleases.set(newReleases);

  await render(<HomePane />);
  expect(screen.getByRole('heading', { name: /new releases/i })).toBeInTheDocument();
  newReleases.forEach((album) => {
    expect(screen.getByRole('link', { name: album.name })).toBeInTheDocument();
  });
});
