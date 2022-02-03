import { render, screen, waitFor, act } from "../../test-utils";
import userEvent from "@testing-library/user-event";

import Login from "../Login";

/* 
  test 1: Test the Login Page renders without error
  test 2: Test that each text field must not be empty and the validation error text shows up
  test 3: Test that an incorrect password and username combination returns a server error
  test 4: Test that a correct password and username combination is accepted and the user gets sent to the home page
  test 5: Test that the password visibility gets toggled correctly
  test 6: Test that when the submit button is clicked that there is a loading icon
*/

describe("Login Page", () => {
  beforeEach(() => render(<Login />, {}));
  test("Login Page renders without error", () => {
    const loginForm = screen.getByRole("form", { name: /login form/i });

    expect(loginForm).toBeInTheDocument();
  });

  test("username field is empty and error text appears", async () => {
    const submitButton = screen.getByRole("button", { name: /login/i });
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    userEvent.clear(usernameField);
    userEvent.click(submitButton);

    const errorText = await screen.findByText(/Username is required/i);
    expect(errorText).toBeInTheDocument();
  });

  test("username field is not empty and there is no error text", async () => {
    const submitButton = screen.getByRole("button", { name: /Login/i });
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    userEvent.clear(usernameField);

    userEvent.type(usernameField, "jblanchard");
    await waitFor(() => expect(usernameField).toHaveValue("jblanchard"));

    userEvent.click(submitButton);

    const errorText = screen.queryByRole("alert", {
      name: /Username is required/i,
    });
    expect(errorText).not.toBeInTheDocument();
  });

  test("password field is empty and error text appears", async () => {
    const submitButton = screen.getByRole("button", { name: /login/i });

    const [passwordField] = screen.getAllByLabelText(/password/i);
    userEvent.clear(passwordField);
    userEvent.click(submitButton);

    const errorText = await screen.findByText(/Password is required/i);
    expect(errorText).toBeInTheDocument();
  });

  test("password field is not empty and there is no error text", async () => {
    const submitButton = screen.getByRole("button", { name: /login/i });

    const [passwordField] = screen.getAllByLabelText(/password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "Jblanch94!");
    userEvent.click(submitButton);

    const errorText = await waitFor(() =>
      screen.queryByText(/Password is required/i)
    );
    expect(errorText).not.toBeInTheDocument();
  });

  test("password field text is visible when clicking on toggle password visibility and it is of type password when clicking on password toggle visibility", () => {
    const passwordToggleVisibility = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    const [passwordField] = screen.getAllByLabelText(/password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "Jblanch94!");

    userEvent.click(passwordToggleVisibility);
    expect(passwordField).toHaveAttribute("type", "text");

    userEvent.click(passwordToggleVisibility);
    expect(passwordField).toHaveAttribute("type", "password");
  });
});
