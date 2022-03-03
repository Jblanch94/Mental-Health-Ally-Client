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
    "https://webapi20211228172142.azurewebsites.net/api/Posts",
    async (req, res, ctx) => {
      const pageNumber = parseInt(req.url.searchParams.get("pageNumber"));
      const pageSize = parseInt(req.url.searchParams.get("pageSize"));

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
        {
          id: 2,
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
        {
          id: 3,
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
        {
          id: 4,
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
        {
          id: 5,
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
        {
          id: 6,
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
        {
          id: 7,
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
        {
          id: 8,
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
        {
          id: 9,
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
        {
          id: 10,
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

      const offset = (pageNumber - 1) * pageSize;

      const response = await res(
        ctx.status(200),
        ctx.json({
          data: posts.slice(offset, pageSize * pageNumber),
          pageNumber,
        })
      );

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

  rest.post(
    "https://webapi20211228172142.azurewebsites.net/api/Groups",
    (req, res, ctx) => {
      const group = {
        id: 1,
        name: req.body.name,
        createdAt: "2021-8-20",
      };

      return res(ctx.status(201), ctx.json({ data: group }));
    }
  ),

  rest.get(
    "https://webapi20211228172142.azurewebsites.net/api/Posts/1",
    (req, res, ctx) => {
      const post = {
        id: 1,
        title: "Post 1",
        body: "**Body 1**",
        createdAt: "2021-08-20",
        user: {
          userName: "test user",
        },
        group: {
          name: "Group 1",
        },
      };

      return res(ctx.status(200), ctx.json({ data: post }));
    }
  ),

  rest.get(
    "https://webapi20211228172142.azurewebsites.net/api/Comments/Post/1",
    (req, res, ctx) => {
      const comments = [
        {
          id: 1,
          text: "Comment 1",
          createdAt: "2022-02-22T16:19:03.970Z",
          user: { userName: "test user" },
          parent: null,
        },
        {
          id: 2,
          text: "Comment 2",
          createdAt: "2022-02-22T16:19:03.970Z",
          user: { userName: "user 2" },
          parent: null,
        },
      ];

      return res(ctx.status(200), ctx.json(comments));
    }
  ),
  rest.post(
    "https://webapi20211228172142.azurewebsites.net/api/Comments/Post/1/Comment",
    (req, res, ctx) => {
      const newComment = {
        id: 3,
        text: req.body.text,
        createdAt: "2022-02-22T16:19:03.970Z",
        parent: null,
        user: {
          userName: "user 1",
        },
      };

      return res(ctx.status(201), ctx.json(newComment));
    }
  ),

  rest.get(
    "https://webapi20211228172142.azurewebsites.net/Post/1",
    (req, res, ctx) => {
      const data = {
        id: 1,
        name: "Misc",
        posts: [
          {
            id: 1,
            title: "Title 1",
            body: "Body 1",
            createdAt: "2022-01-18T15:23:16.7453526",
            updatedAt: "2022-01-18T15:23:16.7453526",
            user: {
              userName: "test user",
            },
          },
        ],
      };

      return res(ctx.status(200), ctx.json({ data: data }));
    }
  ),

  rest.get(
    "https://webapi20211228172142.azurewebsites.net/api/Groups/Post/1",
    (req, res, ctx) => {
      const data = {
        id: 1,
        name: "Misc",
        posts: [
          {
            id: 1,
            title: "Title 1",
            body: "Body 1",
            createdAt: "2022-01-18T15:23:16.7453526",
            updatedAt: "2022-01-18T15:23:16.7453544",
            user: {
              userName: "test user",
            },
            comments: [],
          },
          {
            id: 2,
            title: "Title 2",
            body: "Body 2",
            createdAt: "2022-01-18T15:23:16.7453526",
            updatedAt: "2022-01-18T15:23:16.7453544",
            user: {
              userName: "user 2",
            },
            comments: [],
          },
        ],
      };

      return res(ctx.status(200), ctx.json({ data: data }));
    }
  ),
];
