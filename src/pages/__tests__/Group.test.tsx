import { render, screen } from "../../test-utils";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Group Page", () => {
  beforeEach(() => {
    render(<App />, { initialRoutes: ["/groups/1"] });
  });

  test("Renders without error", async () => {
    const heading = await screen.findByRole("heading", { name: /misc/i });
    expect(heading).toBeInTheDocument();
  });

  test("Renders correct number of posts", async () => {
    const posts = await screen.findAllByRole("article");
    expect(posts.length).toBe(2);
  });

  test("Clicking on Post takes it to correct Post Page", async () => {
    const posts = await screen.findAllByRole("article");
    const post = posts[0];
    userEvent.click(post);

    const heading = await screen.findByRole("heading", { name: /title 1/i });
    expect(heading).toBeInTheDocument();
  });
});
