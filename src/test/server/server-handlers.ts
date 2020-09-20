import { MockedRequest, rest, restContext } from 'msw';
import { DefaultRequestBodyType } from 'msw/lib/types/utils/handlers/requestHandler';
import * as usersDB from '../data/users';
import * as albumsDB from '../data/albums';
import * as db from '../data';
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
    const newReleases = await db.newReleases.read();
    const albumListResponse: AlbumListResponse = {
      albums: {
        items: newReleases,
      },
    };

    return res(ctx.status(200), ctx.json(albumListResponse));
  }),
  rest.get(`${apiUrl}/me/player/currently-playing`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const currentlyPlaying = await db.currentlyPlaying.read();
    if (!currentlyPlaying) {
      return res(ctx.status(204));
    } else {
      return res(ctx.status(200), ctx.json({ item: currentlyPlaying }));
    }
  }),
  rest.get(`${apiUrl}/me/player/recently-played`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const limit = parseInt(req.url.searchParams.get('limit') || '20');
    const recentlyPlayed = (await db.recentlyPlayed.read()).slice(0, limit);
    return res(ctx.status(200), ctx.json({ items: recentlyPlayed }));
  }),
  rest.get(`${apiUrl}/tracks/:trackId`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const { trackId } = req.params;
    const track = await db.tracks.read(trackId);
    return res(ctx.status(200), ctx.json({ ...track }));
  }),
  rest.get(`${apiUrl}/me/tracks/contains`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const trackIds = req.url.searchParams.get('ids')?.split(',') || [];
    const isSavedTracks = await db.savedTracks.checkIsSaved(trackIds);
    return res(ctx.status(200), ctx.json(isSavedTracks));
  }),
  rest.get(`${apiUrl}/me/player`, async (req, res, ctx) => {
    const token = getToken(req);
    if (!token) {
      return res(...missingTokenError(ctx));
    }
    const player = await db.player.read();
    return res(ctx.status(200), ctx.json(player));
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
