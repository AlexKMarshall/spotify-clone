import * as albums from './albums';
import * as artists from './artists';
import * as users from './users';
import * as tracks from './tracks';
import * as currentlyPlaying from './currently-playing';
import * as recentlyPlayed from './recently-played';

const fullTeardown = () => {
  albums.teardown();
  artists.teardown();
  users.teardown();
  tracks.teardown();
  currentlyPlaying.teardown();
  recentlyPlayed.teardown();
};

export { albums, artists, users, tracks, currentlyPlaying, recentlyPlayed, fullTeardown };
