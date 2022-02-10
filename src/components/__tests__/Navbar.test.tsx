import Navbar from "../layout/navbar";
import { render, screen } from "../../test-utils";

// TODO: NEED TO ADD USERNAME PROP FOR NAVBAR TO GET CURRENT USER, STILL NEEDS TO BE IMPLEMENTED IN BOTH NAVBAR AND TEST. FOR NOW A USERNAME IS JUST HARDCODED

describe("Navbar", () => {
  test("Navbar renders without error", () => {
    render(<Navbar authenticated />, {});
    const logo = screen.getByText(/Mental Health Ally/i);
    expect(logo).toBeInTheDocument();
  });

  test("Navbar renders two links, one for register and one for login when user is not authenticated", async () => {
    render(<Navbar authenticated={false} />, {});
    const signUpLink = await screen.findByRole("link", { name: /Sign Up/i });
    const loginLink = await screen.findByRole("link", { name: /Login/i });
    expect(signUpLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test("Navbar renders username link and + icon link when user is authenticated", async () => {
    render(<Navbar authenticated />, {});
    const accountLink = await screen.findByRole("link", {
      name: /jblanchard/i,
    });
    const createPostLink = await screen.findByRole("link", {
      name: /create-post/i,
    });
    expect(accountLink).toBeInTheDocument();
    expect(createPostLink).toBeInTheDocument();
  });
});
