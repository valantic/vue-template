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

export const SESSION_KEY_SEARCH_TERM = 'searchTerm';

export const NOTIFICATION_UNKNOWN_ERROR = {
  message: {
    type: 'error',
    message: i18n.t('globalMessages.unknownApiError'),
  }
};

export const VUEX_COMMIT_ROOT_CONFIG = { root: true, namespaced: true };

export const SHIPMENT_METHOD_DELIVERY = 1;
export const SHIPMENT_METHOD_PICKUP = 2;
