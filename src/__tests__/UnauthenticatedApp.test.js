import React from "react";
import { render, screen } from "../test/test-utils";
import UnauthenticatedApp from "../UnauthenticatedApp";

it("displays link to login to spotify", async () => {
  await render(<UnauthenticatedApp />);

  expect(
    screen.getByRole("link", { name: /login to spotify/i })
  ).toBeInTheDocument();
});
