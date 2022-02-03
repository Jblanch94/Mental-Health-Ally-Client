import { render, screen, waitFor, act } from "../../test-utils";
import userEvent from "@testing-library/user-event";

import Login from "../Login";

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

  test("correct username and password combination yields storage of access token and location of home page", async () => {
    const submitButton = screen.getByRole("button", { name: /login/i });
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const [passwordField] = screen.getAllByLabelText(/password/i);

    userEvent.clear(usernameField);
    userEvent.clear(passwordField);
    userEvent.type(usernameField, "testuser");
    userEvent.type(passwordField, "testpassword");

    await waitFor(() => userEvent.click(submitButton));

    const accessTokenExists = sessionStorage.getItem("accessToken");
    const accessToken =
      accessTokenExists !== null ? JSON.parse(accessTokenExists) : null;

    expect(accessToken).toBe("mockToken123");
    const header = await screen.findByRole("heading", { name: "All Posts" });
    await waitFor(() => expect(header).toBeInTheDocument());
  });
});
