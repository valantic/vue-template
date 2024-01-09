import { ApiResponseMessage } from '@/types/api-response-message';

export type ApiResponseMessages = {
  SUCCESS: ApiResponseMessage[];
  ERROR: ApiResponseMessage[];
  INFO: ApiResponseMessage[];
}

export type ApiResponse = {
  data?: unknown;
  messages?: ApiResponseMessages;
}
