import { HttpResponse, delay, http } from 'msw';
import createApiResponseMessage from '@/styleguide/mock-data/data-object/api-response-message';
import createApiResponseMessages from '@/styleguide/mock-data/data-object/api-response-messages';

export default [
  http.get('/api-request/get', ({ request }) => {
    const { searchParams } = new URL(request.url);

    return HttpResponse.json({
      data: { params: Object.fromEntries(searchParams.entries()) },
    });
  }),

  http.post('/api-request/post', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({ data: { received: body } });
  }),

  http.patch('/api-request/patch', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({ data: { method: 'PATCH', received: body } });
  }),

  http.put('/api-request/put', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({ data: { method: 'PUT', received: body } });
  }),

  http.delete('/api-request/delete', () => HttpResponse.json({ data: { method: 'DELETE' } })),

  http.get('/api-request/headers', ({ request }) => {
    const headers: Record<string, string> = {};

    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return HttpResponse.json({ data: { headers } });
  }),

  http.get('/api-request/slow', async () => {
    await delay(3000);

    return HttpResponse.json({ data: { message: 'Slow response completed' } });
  }),

  http.get('/api-request/error/:status', ({ params }) => {
    const status = Number(params.status);
    const messages = createApiResponseMessages();

    messages.error.push(createApiResponseMessage({ message: `Simulated ${status} error response.` }));

    return HttpResponse.json({ messages }, { status });
  }),
];
