// @see https://mswjs.io/docs/basics/request-handler
import { http, HttpResponse } from 'msw';
import notifications from '@/styleguide/mock-data/api-response/notifications';

export default [
  http.get(
    '/notifications/global',
    ({ request }) => HttpResponse.json(notifications(request))
  ),
];
