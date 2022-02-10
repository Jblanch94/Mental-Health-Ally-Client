import App from "../../App";
import { render, screen } from "../../test-utils/";

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
});
