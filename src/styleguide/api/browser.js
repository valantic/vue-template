import { setupWorker } from 'msw';
import handlers from './handler';

const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: 'bypass', // By default msw shows warning for request that are not handled by it.
});

export default worker;
