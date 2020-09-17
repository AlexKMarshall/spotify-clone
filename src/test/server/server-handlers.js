import { rest } from "msw";
import * as usersDB from "../data/users";

const apiUrl = process.env.REACT_APP_API_URL;

const handlers = [
  rest.get(`${apiUrl}/me`, async (req, res, ctx) => {
    const token = getToken(req);
    const user = await usersDB.read(token);
    return res(ctx.status(200), ctx.json(user));
  }),
];

const getToken = (req) =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

export { handlers };
