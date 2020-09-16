import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import AppProviders from "../context";

const render = async (ui) => {
  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
    }),
  };

  await waitForLoadingToFinish();

  return returnValue;
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

export * from "@testing-library/react";
export { render, waitForLoadingToFinish };
