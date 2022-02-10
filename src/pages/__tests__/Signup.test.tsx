import userEvent from "@testing-library/user-event";

import { screen, render, waitFor } from "../../test-utils";
import App from "../../App";

describe("Sign Up Page", () => {
  beforeEach(() => render(<App />, { initialRoutes: ["/auth/signup"] }));
  test("renders without error", () => {
    const signupForm = screen.getByRole("form", { name: /signup form/i });
    expect(signupForm).toBeInTheDocument();
  });

  test("username, email and password fields when empty display validation error", async () => {
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const [passwordField] = screen.getAllByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    userEvent.clear(usernameField);
    userEvent.clear(emailField);
    userEvent.clear(passwordField);
    userEvent.click(submitButton);

    const usernameErrorText = await screen.findByText(/username is required/i);
    const emailErrorText = await screen.findByText(/email is required/i);
    const passwordErrorText = await screen.findByText(/password is required/i);

    expect(usernameErrorText).toBeInTheDocument();
    expect(emailErrorText).toBeInTheDocument();
    expect(passwordErrorText).toBeInTheDocument();
  });

  test("invalid email displays an error text", async () => {
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    userEvent.clear(emailField);
    userEvent.type(emailField, "123");
    userEvent.click(submitButton);

    const emailErrorText = await screen.findByText(/invalid email/i);
    expect(emailErrorText).toBeInTheDocument();
  });

  test("password toggle visibility is password text onload, clicked it is readable text and click is password text", () => {
    const [passwordField] = screen.getAllByLabelText(/password/i);
    const togglePasswordVisibilityButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordField).toHaveAttribute("type", "password");

    userEvent.click(togglePasswordVisibilityButton);
    expect(passwordField).toHaveAttribute("type", "text");

    userEvent.click(togglePasswordVisibilityButton);
    expect(passwordField).toHaveAttribute("type", "password");
  });

  test("server error is displayed on screen and user is still on the sign up form", async () => {
    const userName = screen.getByRole("textbox", { name: /username/i });
    const email = screen.getByRole("textbox", { name: /email/i });
    const [password] = screen.getAllByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    userEvent.type(userName, "existinguser");
    userEvent.type(email, "123@example.com");
    userEvent.type(password, "password123");
    await waitFor(() => userEvent.click(submitButton));

    const serverErrorText = await screen.findByText(/user already exists/i);
    expect(serverErrorText).toBeInTheDocument();
  });

  test("successful sign up process -> token is stored in session storage and the user is re-directed to the home page", async () => {
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const [passwordField] = screen.getAllByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    userEvent.type(usernameField, "newuser");
    userEvent.type(emailField, "123@example.com");
    userEvent.type(passwordField, "password123");
    await waitFor(() => userEvent.click(submitButton));

    expect(sessionStorage.getItem("accessToken")).not.toBeNull();
    const heading = await screen.findByRole("heading", { name: "All Posts" });
    expect(heading).toBeInTheDocument();
  });
});
