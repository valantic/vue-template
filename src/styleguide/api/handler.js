// @see https://mswjs.io/docs/basics/request-handler
import { rest } from 'msw';
import notificationResponse from '@/styleguide/mock-data/api-response/notification-response';
import notification from '@/styleguide/mock-data/data-object/notification';

export default [
  rest.get('/notifications/global', (req, res, ctx) => {
    const { searchParams } = req.url;

    const notificationItem = notification.createNotification({
      type: searchParams.get('type'),
      selector: searchParams.get('selector'),
      redirectUrl: searchParams.get('redirectUrl'),
      expire: searchParams.get('expire'),
    });

    return res(
      ctx.json(notificationResponse.createApiResponse(notificationItem))
    );
  }),
];
