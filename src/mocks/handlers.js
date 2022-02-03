import { rest } from "msw";

export const handlers = [
  rest.post(
    "https://webapi20211228172142.azurewebsites.net/api/Authentication/Login",
    (req, res, ctx) => {
      const { userName, password } = req.body;

      if (userName === "testuser" && password === "testpassword") {
        sessionStorage.setItem("accessToken", JSON.stringify("mockToken123"));
        return res(ctx.status(200), ctx.json({ accessToken: "mockToken123" }));
      }

      res(
        ctx.status(400),
        ctx.set("Content-Type", "application/json"),
        ctx.json({ message: "Invalid Credentials" })
      );
    }
  ),
];
