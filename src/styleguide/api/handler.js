// @see https://mswjs.io/docs/basics/request-handler
import { http, HttpResponse } from 'msw';
import notificationResponse from '@/styleguide/mock-data/api-response/notification-response';
import notification from '@/styleguide/mock-data/data-object/notification';

export default [
  http.get('/notifications/global', ({ request }) => {
    const { searchParams } = new URL(request.url);

    const notificationItem = notification.createNotification({
      type: searchParams.get('type'),
      selector: searchParams.get('selector'),
      redirectUrl: searchParams.get('redirectUrl'),
      expire: searchParams.get('expire'),
    });

    return HttpResponse.json(notificationResponse.createApiResponse(notificationItem));
  }),
];
