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

const buildAlbum = (overrides?: Partial<Album>): Album => {
  const imgUrl = faker.random.image();
  const imgSizes = [
    { height: 640, width: 640 },
    { height: 320, width: 320 },
    { height: 64, width: 64 },
  ];

  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(randBetween([1, 6])),
    images: imgSizes.map((imgSize) => ({ ...imgSize, url: imgUrl })),
    artists: Array(randBetween([1, 4]))
      .fill(0)
      .map(() => buildArtist()),
    ...overrides,
  };
};

const randBetween = ([min, max] = [1, 10]) => Math.floor(Math.random() * (max - min + 1)) + min;

export { buildUser, buildArtist, buildAlbum };