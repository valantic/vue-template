import { ApiResponseMessages } from '@/types/api-response';

/**
 * Creates an API response messages object.
 */
export default function createApiResponseMessages(options?: Partial<ApiResponseMessages>): ApiResponseMessages {
  return {
    SUCCESS: [],
    ERROR: [],
    INFO: [],
    ...options,
  };
}
