import { setupWorker } from 'msw/browser';
import handlers from './handler';

const worker = setupWorker(...handlers);

await worker.start({
  onUnhandledRequest: 'bypass', // By default msw shows warning for request that are not handled by it.
});

export default worker;
