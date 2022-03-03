import userEvent from "@testing-library/user-event";

import { render, screen, act, findAllByRole } from "../../test-utils";
import App from "../../App";

describe("Groups Page", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/groups"] });
    });
  });
  test("Renders without error", () => {
    const heading = screen.getByRole("heading", { name: /all groups/i });
    expect(heading).toBeInTheDocument();
  });

  test("Renders correct number of Links", async () => {
    const main = screen.getByRole("main");
    const groups = await findAllByRole(main, "link");
    expect(groups.length).toBe(1);
  });

  test("Clicking on link directs to Group Page", async () => {
    const miscGroup = await screen.findByRole("link", { name: /misc/i });
    userEvent.click(miscGroup);

    const heading = await screen.findByRole("heading", { name: /misc/i });
    expect(heading).toBeInTheDocument();
  });
});
