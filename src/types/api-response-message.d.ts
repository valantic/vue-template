import { ApiResponseMessageAction } from '@/setup/globals';

export type ApiResponseMessage = {
  message: string;
  secondsToShow?: number;
  redirectUrl?: string;
  showToUser: boolean;
  action?: ApiResponseMessageAction;
};
