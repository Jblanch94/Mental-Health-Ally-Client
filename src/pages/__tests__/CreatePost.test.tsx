import App from "../../App";
import { render, screen, findByRole, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";

describe("Create Post Page", () => {
  test("The Groups are fetched upon page load and rendered as options inside the Select component", async () => {
    sessionStorage.setItem("accessToken", "mockToken123");
    render(<App />, {
      initialRoutes: ["/posts/create"],
      authProviderProps: {
        authenticated: true,
      },
    });
    const groupButton = screen.getByRole("button", { name: /group/i });
    userEvent.click(groupButton);
    const options = await screen.findAllByRole("option");
    expect(options.length).toBe(1);
  });

  test("Submitting form without values provides error text for user for each field", async () => {
    sessionStorage.setItem("accessToken", "mockToken123");
    render(<App />, {
      initialRoutes: ["/posts/create"],
      authProviderProps: {
        authenticated: true,
      },
    });
    const submitButton = screen.getByRole("button", { name: /create post/i });
    userEvent.click(submitButton);

    const titleContainer = screen.getByTestId("title");
    const titleErrorText = await findByRole(titleContainer, "alert");
    expect(titleErrorText.textContent).toBe("Title is required");

    const groupContainer = screen.getByTestId("form-control");
    const groupErrorText = await findByRole(groupContainer, "alert");
    expect(groupErrorText.textContent).toBe("Group is required");
  });

  test("Upon successful form submission the user is taken back to home page", async () => {
    sessionStorage.setItem("accessToken", "mockToken123");
    render(<App />, {
      initialRoutes: ["/posts/create"],
      authProviderProps: {
        authenticated: true,
      },
    });
    const submitButton = screen.getByRole("button", { name: /create post/i });
    const title = screen.getByRole("textbox", { name: /title/i });
    userEvent.type(title, "Title 1");
    const groupButton = screen.getByRole("button", { name: /group/i });
    userEvent.click(groupButton);
    const options = await screen.findAllByRole("option");
    const selectedOption = options[0];
    userEvent.click(selectedOption);

    userEvent.click(submitButton);
    const heading = await screen.findByRole("heading", { name: /all posts/i });
    expect(heading).toBeInTheDocument();
  });

  test("user not authenticated is re-directed", async () => {
    sessionStorage.removeItem("accessToken");
    render(<App />, {
      initialRoutes: ["/posts/create"],
    });

    const heading = await screen.findByRole("heading", { name: /all posts/i });
    await waitFor(() => expect(heading).toBeInTheDocument());
  });
});
