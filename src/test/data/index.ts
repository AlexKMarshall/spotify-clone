import * as albums from './albums';
import * as artists from './artists';
import * as users from './users';
import * as tracks from './tracks';
import * as currentlyPlaying from './currently-playing';

const fullTeardown = () => {
  albums.teardown();
  artists.teardown();
  users.teardown();
  tracks.teardown();
  currentlyPlaying.teardown();
};

export { albums, artists, users, tracks, currentlyPlaying, fullTeardown };
