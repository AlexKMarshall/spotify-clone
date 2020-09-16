import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { buildUser } from "./generate";
import * as usersDB from "./data/users";
import AppProviders from "../context";

const render = async (ui, { user } = {}) => {
  // if you want to render the app unauthenticated, pass "null" as the user
  user = typeof user === "undefined" ? await loginAsUser() : user;

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

const loginAsUser = async (userProperties) => {
  const user = buildUser(userProperties);
  const authUser = await usersDB.create(user);
  window.location.hash = `access_token=${authUser.token}&token_type=Bearer&expires_in=3600`;
  return authUser;
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

export * from "@testing-library/react";
export { render, waitForLoadingToFinish };
