import createApiResponseMessage from '@/styleguide/mock-data/data-object/api-response-message';
import createApiResponseMessages from '@/styleguide/mock-data/data-object/api-response-messages';
import { ApiResponse } from '@/types/api-response';

export default function notifications(req: Request): ApiResponse | null {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type');
  const redirectUrl = searchParams.get('redirectUrl');
  const expire = JSON.parse(searchParams.get('expire') || 'true');
  const messages = createApiResponseMessages();
  const message = {
    message: `This is an example ${searchParams.get('type')} message.`,
    redirectUrl: redirectUrl || '',
    secondsToShow: expire ? 3000 : -1,
  };

  switch (type) {
    case 'success':
      messages.success.push(createApiResponseMessage(message));
      break;

    case 'info':
      messages.info.push(createApiResponseMessage(message));
      break;

    default:
      messages.error.push(createApiResponseMessage(message));
      break;
  }

  return {
    data: {},
    messages,
  };
}
