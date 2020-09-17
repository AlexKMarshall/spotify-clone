import { MockedRequest, rest } from 'msw';
import { DefaultRequestBodyType } from 'msw/lib/types/utils/handlers/requestHandler';
import * as usersDB from '../data/users';

const apiUrl = process.env.REACT_APP_API_URL;

const handlers = [
  rest.get(`${apiUrl}/me`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({
          error: {
            status: '401',
            message: 'No token provided',
          },
        }),
      );
    }
    const user = await usersDB.read(token);
    return res(ctx.status(200), ctx.json(user));
  }),
];

const getToken = (req: MockedRequest<DefaultRequestBodyType>) =>
  req.headers.get('Authorization')?.replace('Bearer ', '');

export { handlers };
