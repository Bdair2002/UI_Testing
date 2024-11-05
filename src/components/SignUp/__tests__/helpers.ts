import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/* Getters */
export const getInput = (label) =>
  screen.getByLabelText(new RegExp(`^${label}`, "i"));
export const getSignUpButton = () =>
  screen.getByRole("button", {
    name: /Sign up/i,
  });
/* Actions */

export const fillUserForm = (user) => {
  const emailInput = getInput("Email Address");
  const passwordInput = getInput("Password");
  const userNameInput = getInput("User Name");
  userEvent.type(emailInput, user.email);
  userEvent.type(passwordInput, user.password);
  userEvent.type(userNameInput, user.username);
};

export const signUpUser = async (user) => {
  fillUserForm(user);
  const signUpButton = getSignUpButton();
  await act(async () => {
    userEvent.click(signUpButton);
  });
};

export const typeInput = (input, value) => {
  userEvent.type(input, value);
  userEvent.click(document.body);
};

export const clearInput = (input) => {
  userEvent.clear(input);
  userEvent.click(document.body);
};
