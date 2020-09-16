import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AuthProvider } from "../context/auth-context";
import UnauthenticatedApp from "../UnauthenticatedApp";

it("displays link to login to spotify", async () => {
  render(
    <AuthProvider>
      <UnauthenticatedApp />
    </AuthProvider>
  );

  await waitForLoadingToFinish();
  expect(
    screen.getByRole("link", { name: /login to spotify/i })
  ).toBeInTheDocument();
});

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);
