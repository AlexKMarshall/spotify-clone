import React from "react";
import { render, screen } from "../test/test-utils";
import App from "../App";

it("renders the app", async () => {
  await render(<App />);

  expect(
    screen.getByRole("link", { name: /your library/i })
  ).toBeInTheDocument();
});
