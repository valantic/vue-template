import { faker } from '@faker-js/faker/locale/en';
import { ApiResponseMessage } from '@/types/api-response-message';

/**
 * Creates a randomized API response message.
 */
export default function createApiResponseMessage(options?: Partial<ApiResponseMessage>): ApiResponseMessage {
  return {
    message: faker.lorem.sentence(),
    showToUser: true,
    secondsToShow: 3,
    ...options,
  };
}
