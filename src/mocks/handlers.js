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

  rest.post(
    "https://webapi20211228172142.azurewebsites.net/api/Authentication/Register",
    async (req, res, ctx) => {
      const { userName } = req.body;

      if (userName === "existinguser") {
        return res(
          ctx.status(400),
          ctx.json({ message: "User already exists!" })
        );
      } else {
        sessionStorage.setItem("accessToken", "mockToken123");

        return res(ctx.status(200), ctx.json({ accessToken: "mockToken123" }));
      }
    }
  ),

  rest.get(
    "https://webapi20211228172142.azurewebsites.net/api/Posts/",
    async (req, res, ctx) => {
      const posts = [
        {
          id: 1,
          body: "Body 1",
          createdAt: "2021-8-20",
          title: "Title 1",
          updatedAt: "2021-8-20",
          user: {
            userName: "test-user",
          },
          comments: [],
          group: {
            id: 1,
            name: "Misc",
            createdAt: "2021-8-20",
          },
        },
      ];

      const response = await res(ctx.status(200), ctx.json({ data: posts }));

      return response;
    }
  ),

  rest.get(
    "https://webapi20211228172142.azurewebsites.net/api/Groups/",
    async (req, res, ctx) => {
      const groups = [{ id: 1, name: "Misc", createdAt: "2021-8-20" }];

      return await res(ctx.status(200), ctx.json({ data: groups }));
    }
  ),

  rest.post(
    "https://webapi20211228172142.azurewebsites.net/api/Posts/Group/1",
    (req, res, ctx) => {
      const post = {
        id: 1,
        title: "Title 1",
        body: "Body 1",
        createdAt: "2021-8-20",
        updatedAt: "2021-8-20",
      };

      return res(ctx.status(201), ctx.json({ data: post }));
    }
  ),
];
