// Fake user store for test purposes
import faker from "faker";

const userStore = {};

const create = async (user) => {
  const token = btoa(faker.random.uuid());
  userStore[token] = user;
  return { ...user, token };
};

const read = async (token) => {
  const user = userStore[token];
  return user;
};

export { create, read };
