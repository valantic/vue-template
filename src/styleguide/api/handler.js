// @see https://mswjs.io/docs/basics/request-handler
import { rest } from 'msw';
import notifications from '@/styleguide/mock-data/api-response/notifications';

export default [
  rest.get('/notifications/global', (req, res, ctx) => res(
    ctx.json(notifications(req))
  )),
];
