import React from "react";
import { render, screen } from "../test/test-utils";
import App from "../App";

it("displays link to login to spotify", async () => {
  await render(<App />, { user: null });

  expect(
    screen.getByRole("link", { name: /login to spotify/i })
  ).toBeInTheDocument();
});
