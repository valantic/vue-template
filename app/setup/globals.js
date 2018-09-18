/* eslint-disable import/prefer-default-export */
import { i18n } from './i18n';

export const BREAKPOINTS = { // Keep in sync with SCSS variables!
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440
};

export const RESIZE_DEBOUNCE = 100;

export const NOTIFICATION_UNKNOWN_ERROR = {
  message: {
    type: 'error',
    message: i18n.t('globalMessages.unknownApiError'),
  }
};
