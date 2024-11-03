import render from "../../render";
import React from "react";
import { server } from "../../../mocks/server";
import { signUpUser } from "../../../components/SignUp/__tests__/SignUp.test";
import { screen } from "@testing-library/react";
import App from "../../../App";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should redirect user to home page after successful signup", async () => {
  render(<App />);
  const signUpButton = screen.getByRole("button", { name: /Sign up/i });
  expect(signUpButton).toBeInTheDocument();
  await signUpUser();
  const startNowButton = screen.getByRole("button", { name: /Start Now/i });
  expect(startNowButton).toBeInTheDocument();
});
