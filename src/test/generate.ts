import faker from 'faker';
import { User } from '../types/User';
import { Album } from '../types/Album';
import { Artist } from '../types/Artist';
import { Track } from '../types/Track';
import { Player } from '../types/Player';

const buildUser = (overrides?: Partial<User>): User => ({
  display_name: faker.name.findName(),
  images: [{ url: faker.internet.avatar() }],
  ...overrides,
});

const buildArtist = (overrides?: Partial<Artist>): Artist => ({
  id: faker.random.uuid(),
  name: `${faker.lorem.words(randBetween([1, 3]))}${faker.random.words(randBetween([0, 2]))}`,
  ...overrides,
});

const buildAlbum = (overrides?: Partial<Album>): Album => {
  const imgSizes = [
    { height: 640, width: 640 },
    { height: 320, width: 320 },
    { height: 64, width: 64 },
  ];

  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(randBetween([2, 6])),
    images: imgSizes.map((imgSize) => ({ ...imgSize, url: faker.random.image() })),
    artists: Array(randBetween([1, 4]))
      .fill(0)
      .map(() => buildArtist()),
    ...overrides,
  };
};

const buildTrack = (overrides?: Partial<Track>): Track => {
  const album = buildAlbum();
  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(randBetween([1, 6])),
    album: album,
    artists: album.artists,
    duration_ms: randBetween([5000, 1000 * 60 * 10]),
    ...overrides,
  };
};

const buildPlayer = (overrides?: Partial<Player>): Player => {
  const track = buildTrack();
  return {
    is_playing: faker.random.boolean(),
    progress_ms: randBetween([0, track.duration_ms]),
    item: buildTrack(),
    actions: { disallows: {} },
    ...overrides,
  };
};

const randBetween = ([min, max] = [1, 10]) => Math.floor(Math.random() * (max - min + 1)) + min;

export { buildUser, buildArtist, buildAlbum, buildTrack, buildPlayer };
