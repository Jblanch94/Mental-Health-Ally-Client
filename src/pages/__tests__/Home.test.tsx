import App from "../../App";
import { render, screen, findAllByRole } from "../../test-utils/";

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
    const groupLinks = await findAllByRole(sidebar, "link");
    expect(groupLinks.length).toBe(1);
  });

  test("Home page renders the correct number of posts", async () => {
    render(<App />, { initialRoutes: ["/"] });
    const main = screen.getByRole("main");
    const posts = await findAllByRole(main, "article");
    expect(posts.length).toBe(1);
  });
});
