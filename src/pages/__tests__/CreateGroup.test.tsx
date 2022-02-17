import userEvent from "@testing-library/user-event";

import App from "../../App";
import { render, screen, findByRole } from "../../test-utils";

describe("Create Group Page", () => {
  test("Renders without error", () => {
    sessionStorage.setItem("accessToken", "mockToken123");
    render(<App />, {
      initialRoutes: ["/groups/create"],
      authProviderProps: { authenticated: true },
    });

    const formHeading = screen.getByRole("heading", { name: /create group/i });
    expect(formHeading).toBeInTheDocument();
  });

  test("Submitting form without filling in required field results in error text being rendered", async () => {
    sessionStorage.setItem("accessToken", "mockToken123");
    render(<App />, {
      initialRoutes: ["/groups/create"],
      authProviderProps: { authenticated: true },
    });

    const submitButton = screen.getByRole("button", { name: /create group/i });
    userEvent.click(submitButton);

    const nameContainer = screen.getByTestId("name");
    const errorText = await findByRole(nameContainer, "alert");

    expect(errorText).toBeInTheDocument();
  });

  test("User is not authenticated results of user being directed to the Login Page", async () => {
    sessionStorage.removeItem("accessToken");
    render(<App />, {
      initialRoutes: ["/groups/create"],
    });

    const formHeading = await screen.findByRole("heading", {
      name: /login with mental health ally/i,
    });

    expect(formHeading).toBeInTheDocument();
  });

  test("Submitting form with correct data results in one group being created and being directed to the home page", async () => {
    sessionStorage.setItem("accessToken", "mockToken123");
    render(<App />, { initialRoutes: ["/groups/create"] });

    const submitButton = screen.getByRole("button", { name: /create group/i });
    const nameField = screen.getByRole("textbox", { name: /name/i });

    userEvent.type(nameField, "group1");

    userEvent.click(submitButton);

    const heading = await screen.findByRole("heading", { name: /all posts/i });
    expect(heading).toBeInTheDocument();
  });
});
