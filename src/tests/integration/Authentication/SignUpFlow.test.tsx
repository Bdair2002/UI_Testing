import render from "../../render";
import React from "react";
import { server } from "../../../mocks/server";
import * as getters from "../../../components/SignUp/__tests__/helpers";
import { screen } from "@testing-library/react";
import App from "../../../App";
import { mockedUser } from "../../../mocks/data/signupMockData";
import { debug } from "jest-preview";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should redirect user to home page after successful signup", async () => {
  render(<App />);
  const signUpButton = screen.getByRole("button", { name: /Sign up/i });
  expect(signUpButton).toBeInTheDocument();
  await getters.signUpUser(mockedUser);
  debug();
  const startNowButton = screen.getByRole("button", { name: /Start Now/i });
  debug();
  expect(startNowButton).toBeInTheDocument();
});
