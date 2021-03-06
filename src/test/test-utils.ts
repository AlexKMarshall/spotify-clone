import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { buildUser } from './generate';
import * as usersDB from './data/users';
import AppProviders from '../context';
import { User } from '../types/User';

type RenderOptions = {
  user?: User | null;
};

const render = async (ui: React.ReactElement, { user, ...renderOptions }: RenderOptions & RtlRenderOptions = {}) => {
  // if you want to render the app unauthenticated, pass "null" as the user
  user = typeof user === 'undefined' ? await loginAsUser() : user;

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
      ...renderOptions,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

const loginAsUser = async (userProperties?: Partial<User>) => {
  const user = buildUser(userProperties);
  const authUser = await usersDB.create(user);
  window.location.hash = `access_token=${authUser.token}&token_type=Bearer&expires_in=3600`;
  return authUser;
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)]);

export * from '@testing-library/react';
export { render, rtlRender, waitForLoadingToFinish };
