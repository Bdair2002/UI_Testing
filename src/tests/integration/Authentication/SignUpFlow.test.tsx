import SignUp from "../../../components/SignUp";
import HomePage from "../../../components/HomePage";
import render from "../../render";
import React from "react";
import { server } from "../../../mocks/server";
import { signUpUser } from "../../../components/SignUp/__tests__/SignUp.test";
import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import { debug } from "jest-preview";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should redirect user to home page after successful signup", async () => {
  render(<App />);
  debug();
  const signUpButton = screen.getByRole("button", { name: /Sign up/i });
  expect(signUpButton).toBeInTheDocument();
  await signUpUser();
  debug();
  const startNowButton = screen.getByRole("button", { name: /Start Now/i });
  expect(startNowButton).toBeInTheDocument();
  debug();
});
