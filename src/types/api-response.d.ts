import { ApiResponseMessage } from '@/types/api-response-message';

export type ApiResponseMessages = {
  success: ApiResponseMessage[];
  error: ApiResponseMessage[];
  info: ApiResponseMessage[];
};

export type ApiResponse = {
  data?: unknown;
  messages?: ApiResponseMessages;
};
