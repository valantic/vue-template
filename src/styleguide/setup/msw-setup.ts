import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';

const handlersFiles = import.meta.glob('../msw-handlers/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  HttpHandler[]
>;
const handlers: HttpHandler[] = [];

Object.values(handlersFiles).forEach((items) => {
  handlers.push(...items);
});

const worker = setupWorker(...handlers);

await worker.start({
  onUnhandledRequest: 'bypass', // By default, msw shows warning for request that are not handled by it.
});

export default worker;
