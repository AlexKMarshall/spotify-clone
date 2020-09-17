import faker from 'faker';
import { User } from '../types/User';
import { Album } from '../types/Album';
import { Artist } from '../types/Artist';

const buildUser = (overrides?: Partial<User>): User => ({
  display_name: faker.name.findName(),
  images: [{ url: faker.internet.avatar() }],
  ...overrides,
});

const buildArtist = (overrides?: Partial<Artist>): Artist => ({
  id: faker.random.uuid(),
  name: faker.lorem.words(randBetween([1, 4])),
  ...overrides,
});

const buildAlbum = (overrides?: Partial<Album>): Album => ({
  id: faker.random.uuid(),
  name: faker.lorem.words(randBetween([1, 6])),
  images: [{ height: 600, url: faker.random.image(), width: 600 }],
  artists: Array(randBetween([1, 4]))
    .fill(0)
    .map(() => buildArtist()),
});

const randBetween = ([min, max] = [1, 10]) => Math.floor(Math.random() * (max - min + 1)) + min;

export { buildUser, buildArtist, buildAlbum };
