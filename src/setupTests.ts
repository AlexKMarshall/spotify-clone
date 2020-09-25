// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './test/server';
import { fullTeardown } from './test/data';
import { queryCache } from 'react-query';

beforeAll(() => server.listen());

afterEach(async () => {
  fullTeardown();
  server.resetHandlers();
  queryCache.clear();
});

afterAll(() => server.close());
