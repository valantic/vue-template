import { ApiResponseMessages } from '@/types/api-response';

/**
 * Creates an API response messages object.
 */
export default function createApiResponseMessages(options?: Partial<ApiResponseMessages>): ApiResponseMessages {
  return {
    success: [],
    error: [],
    info: [],
    ...options,
  };
}
