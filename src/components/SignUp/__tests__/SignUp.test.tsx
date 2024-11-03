import React from "react";
import render from "../../../tests/render";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "..";
import { debug } from "jest-preview";
// import { server } from "../../../mocks/server";
// import { http, HttpResponse } from "msw";
const {
  mockedUser,
  mockedSuccessUser,
} = require("../../../mocks/data/signupMockData");
import axios from "axios";
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

const getters = {
  getEmailInput: () => screen.getByLabelText(/^Email Address/),
  getPasswordInput: () => screen.getByLabelText(/^Password/),
  getUserNameInput: () => screen.getByLabelText(/^User Name/),
  getSignUpButton: () =>
    screen.getByRole("button", {
      name: /Sign up/i,
    }),
};

function fillUserForm() {
  const emailInput = getters.getEmailInput();
  const passwordInput = getters.getPasswordInput();
  const userNameInput = getters.getUserNameInput();
  userEvent.type(emailInput, mockedUser.email);
  userEvent.type(passwordInput, mockedUser.password);
  userEvent.type(userNameInput, mockedUser.username);
}

export const signUpUser = async () => {
  fillUserForm();
  const signUpButton = getters.getSignUpButton();
  await act(async () => {
    userEvent.click(signUpButton);
  });
};

describe("SignUp Component", () => {
  describe("Validation", () => {
    beforeEach(() => {
      render(<SignUp />);
    });
    it("should display validation errors for invalid email", async () => {
      const emailInput = getters.getEmailInput();
      userEvent.type(emailInput, "invalid-email");
      userEvent.click(document.body);
      const validationMessage = await screen.findByText("Enter a valid email");
      expect(validationMessage).toBeInTheDocument();
      // use jest preview to debug your test
    });

    it("should display validation errors for short password", async () => {
      const passwordInput = getters.getPasswordInput();
      userEvent.type(passwordInput, "123");
      userEvent.click(document.body);
      const validationMessage = await screen.findByText(
        "Password should be of minimum 8 characters length"
      );
      expect(validationMessage).toBeInTheDocument();
      debug();
    });

    it("should display success message on successful sign-up", async () => {
      debug();
      const signUpAPI = jest
        .spyOn(axios, "post")
        .mockImplementation((url) => Promise.resolve(mockedSuccessUser));
      await signUpUser();
      await waitFor(() => {
        expect(signUpAPI).toBeCalled();
      });
      const successMessage = await screen.findByText("Sign Up Successfully!");
      expect(successMessage).toBeInTheDocument();
      debug();
    });

    it("should display error message on sign-up failure", async () => {
      debug();
      // server.use(
      //   http.post("*/users", () => {
      //     return new HttpResponse(null, {
      //       status: 500,
      //     });
      //   })
      // );

      jest
        .spyOn(axios, "post")
        .mockImplementation((url) => Promise.reject(new Error("Error")));
      await signUpUser();
      const errorMessage = await screen.findByText("Error Signing Up!");
      expect(errorMessage).toBeInTheDocument();
      debug();
    });
  });

  describe("Form Interaction", () => {
    beforeEach(() => {
      render(<SignUp />);
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("should enable Sign Up button when form is valid", async () => {
      fillUserForm();
      const signUpButton = getters.getSignUpButton();
      await waitFor(() => {
        expect(signUpButton).toBeEnabled();
      });
      debug();
    });

    it("should disable Sign Up button when form is invalid", async () => {
      const signUpButton = getters.getSignUpButton();
      const emailInput = getters.getEmailInput();
      fillUserForm();
      userEvent.clear(emailInput);
      await waitFor(() => {
        expect(signUpButton).toBeDisabled();
      });
    });

    it("should update form fields on user input", async () => {
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();
      const userNameInput = getters.getUserNameInput();
      fillUserForm();

      await waitFor(() => {
        expect(emailInput).toHaveValue(mockedUser.email);
      });

      await waitFor(() => {
        expect(passwordInput).toHaveValue(mockedUser.password);
      });

      await waitFor(() => {
        expect(userNameInput).toHaveValue(mockedUser.username);
      });
    });
  });
});
