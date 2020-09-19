import * as albums from './albums';
import * as artists from './artists';
import * as users from './users';
import * as tracks from './tracks';
import * as currentlyPlaying from './currently-playing';
import * as recentlyPlayed from './recently-played';
import * as newReleases from './new-releases';

const fullTeardown = () => {
  albums.teardown();
  artists.teardown();
  users.teardown();
  tracks.teardown();
  currentlyPlaying.teardown();
  recentlyPlayed.teardown();
  newReleases.teardown();
};

export { albums, artists, users, tracks, currentlyPlaying, recentlyPlayed, newReleases, fullTeardown };
