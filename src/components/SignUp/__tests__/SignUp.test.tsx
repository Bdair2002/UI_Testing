import React from "react";
import render from "../../../tests/render";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "..";
const {
  mockedUser,
  mockedSuccessUser,
} = require("../../../mocks/data/signupMockData");
import axios from "axios";
import * as getters from "./helpers";
import { get } from "http";

describe("SignUp Component", () => {
  describe("Validation", () => {
    beforeEach(() => {
      render(<SignUp />);
    });
    it("should display validation errors for invalid email", async () => {
      const emailInput = getters.getInput("Email Address");
      getters.typeInput(emailInput, "invalidemail");
      const validationMessage = await screen.findByText("Enter a valid email");
      expect(validationMessage).toBeInTheDocument();
    });

    it("should display validation errors for short password", async () => {
      const passwordInput = getters.getInput("Password");
      getters.typeInput(passwordInput, "123");
      const validationMessage = await screen.findByText(
        "Password should be of minimum 8 characters length"
      );
      expect(validationMessage).toBeInTheDocument();
    });

    it("should display success message on successful sign-up", async () => {
      const signUpAPI = jest
        .spyOn(axios, "post")
        .mockImplementation((url) => Promise.resolve(mockedSuccessUser));
      await getters.signUpUser(mockedUser);
      const successMessage = await screen.findByText("Sign Up Successfully!");
      expect(successMessage).toBeInTheDocument();
    });

    it("should display error message on sign-up failure", async () => {
      jest
        .spyOn(axios, "post")
        .mockImplementation((url) => Promise.reject(new Error("Error")));
      await getters.signUpUser(mockedUser);
      const errorMessage = await screen.findByText("Error Signing Up!");
      expect(errorMessage).toBeInTheDocument();
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
      getters.fillUserForm(mockedUser);
      const signUpButton = getters.getSignUpButton();
      await waitFor(() => {
        expect(signUpButton).toBeEnabled();
      });
    });

    it("should disable Sign Up button when form is invalid", async () => {
      const signUpButton = getters.getSignUpButton();
      const emailInput = getters.getInput("Email Address");
      getters.fillUserForm(mockedUser);
      getters.clearInput(emailInput);
      await waitFor(() => {
        expect(signUpButton).toBeDisabled();
      });
    });

    it("should update form fields on user input", async () => {
      const inputs = [
        { element: getters.getInput("Email Address"), value: mockedUser.email },
        { element: getters.getInput("Password"), value: mockedUser.password },
        { element: getters.getInput("User Name"), value: mockedUser.username },
      ];

      inputs.forEach(({ element, value }) => {
        getters.typeInput(element, value);
      });

      await waitFor(() => {
        inputs.forEach(({ element, value }) => {
          expect(element).toHaveValue(value);
        });
      });
    });
  });
});
