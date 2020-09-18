import React from "react";
import { render, screen } from "../../test/test-utils";
import UserProfile from "../UserProfile";

it("should render UserProfile with displayName and avatar", async () => {
  const { user } = await render(<UserProfile />);

  const { display_name } = user;
  const avatarUrl = user.images[0].url;

  expect(screen.getByText(display_name)).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /avatar/i })).toHaveAttribute(
    "src",
    avatarUrl
  );
});
