import userEvent from "@testing-library/user-event";

import App from "../../App";
import { render, screen, findAllByRole, waitFor, act } from "../../test-utils/";

describe("Home Page", () => {
  test("Home Page renders without error", async () => {
    render(<App />, { initialRoutes: ["/"] });
    const header = screen.getByRole("heading");
    const sidebar = screen.getByRole("complementary");
    const main = screen.getByRole("main");

    expect(header).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  test("Home Page renders the correct number of groups as links", async () => {
    render(<App />, { initialRoutes: ["/"] });
    const sidebar = screen.getByRole("complementary");
    const groupLinks = await findAllByRole(sidebar, "listitem");
    expect(groupLinks.length).toBe(1);
  });

  test("Home page renders the correct number of posts", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/"] });
      const main = screen.getByRole("main");
      let posts = await findAllByRole(main, "article");
      expect(posts.length).toBe(5);

      const loadMoreBtn = screen.getByRole("button", {
        name: /load more posts/i,
      });
      await waitFor(async () => {
        userEvent.click(loadMoreBtn);
        posts = await findAllByRole(main, "article");
        expect(posts.length).toBe(10);
      });
    });
  });

  test("Home Page renders a Skeleton for the posts and groups", async () => {
    render(<App />, { initialRoutes: ["/"] });
    const postsSkeleton = screen.getAllByTestId("post-skeleton");
    expect(postsSkeleton.length).toBe(4);

    const groupsSkeleton = screen.getAllByTestId("group-skeleton");
    expect(groupsSkeleton.length).toBe(5);

    await waitFor(() => {
      expect(screen.queryAllByTestId("post-skeleton").length).toBe(0);
      expect(screen.queryAllByTestId("group-skeleton").length).toBe(0);
    });
  });
});
