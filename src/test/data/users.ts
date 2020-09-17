// Fake user store for test purposes
import faker from 'faker';
import { User, AuthUser } from '../../types/User';

type UserStore = {
  [token: string]: User;
};
const userStore: UserStore = {};

const create = async (user: User): Promise<AuthUser> => {
  const token = btoa(faker.random.uuid());
  userStore[token] = user;
  return { ...user, token };
};

const read = async (token: string) => {
  const user = userStore[token];
  return user;
};

const teardown = async () => {
  for (const key in userStore) {
    delete userStore[key];
  }
};

export { create, read, teardown };
