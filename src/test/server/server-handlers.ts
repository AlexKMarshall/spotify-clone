import { MockedRequest, rest, restContext } from 'msw';
import { DefaultRequestBodyType } from 'msw/lib/types/utils/handlers/requestHandler';
import * as usersDB from '../data/users';
import * as albumsDB from '../data/albums';
import { AlbumListResponse } from '../../types/Album';

const apiUrl = process.env.REACT_APP_API_URL;

const handlers = [
  rest.get(`${apiUrl}/me`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const user = await usersDB.read(token);
    return res(ctx.status(200), ctx.json(user));
  }),
  rest.get(`${apiUrl}/browse/new-releases`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const storedAlbums = await albumsDB.readAll();
    const albumListResponse: AlbumListResponse = {
      albums: {
        items: storedAlbums,
      },
    };

    return res(ctx.status(200), ctx.json(albumListResponse));
  }),
];

const getToken = (req: MockedRequest<DefaultRequestBodyType>) =>
  req.headers.get('Authorization')?.replace('Bearer ', '');

const missingTokenError = (ctx: typeof restContext) => [
  ctx.status(401),
  ctx.json({
    error: {
      status: '401',
      message: 'No token provided',
    },
  }),
];

export { handlers };
