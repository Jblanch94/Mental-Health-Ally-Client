import { render, screen, act, fireEvent, waitFor } from "../../test-utils";
import App from "../../App";

describe("Post Page", () => {
  test("Renders without error", async () => {
    render(<App />, { initialRoutes: ["/posts/1"] });
    const heading = await screen.findByRole("heading", { name: /post 1/i });
    expect(heading).toBeInTheDocument();
  });

  test("Displays the correct post and comments", async () => {
    render(<App />, { initialRoutes: ["/posts/1"] });
    const postTitle = await screen.findByRole("heading", {
      name: /post 1/i,
    });
    expect(postTitle).toBeInTheDocument();

    const postBody = await screen.findByText(/body 1/i);
    expect(postBody).toBeInTheDocument();

    const numComments = await screen.findByText(/2 comments/i);
    expect(numComments).toBeInTheDocument();
  });

  test("User not authenticated Login and Sign Up Links appear", async () => {
    sessionStorage.removeItem("accessToken");
    render(<App />, { initialRoutes: ["/posts/1"] });
    const loginLinks = await screen.findAllByRole("link", { name: /login/i });
    const signupLinks = await screen.findAllByRole("link", {
      name: /sign up/i,
    });
    expect(loginLinks.length).toBe(2);
    expect(signupLinks.length).toBe(2);
  });

  test("Creating a new comment adds the new comment to the list of comments", async () => {
    sessionStorage.setItem("accessToken", "mockToken123");

    await act(async () => {
      render(<App />, {
        initialRoutes: ["/posts/1"],
        authProviderProps: {
          authenticated: true,
        },
      });
    });

    const commentBox = await screen.findByRole("textbox");
    const commentBtn = await screen.findByRole("button", {
      name: /comment/i,
    });

    await act(async () => {
      fireEvent.input(commentBox, {
        target: {
          value: "Comment 3",
        },
      });

      fireEvent.submit(commentBtn);
    });

    await waitFor(async () => {
      const comments = await screen.findAllByRole("listitem");
      expect(comments.length).toBe(3);
    });
  });
});
