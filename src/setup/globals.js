/* eslint-disable import/prefer-default-export */
import i18n from './i18n';

/**
 * @type {Object} Lookup table of available breakpoints.
 *
 * Keep in sync with SCSS variables!
 */
export const BREAKPOINTS = { // Keep in sync with SCSS variables!
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440
};

/**
 * @type {Number} Global resize debounce value.
 */
export const RESIZE_DEBOUNCE = 100;

/**
 * @type {Object} The default 'unknown error' notification message.
 */
export const NOTIFICATION_UNKNOWN_ERROR = {
  message: {
    type: 'error',
    message: i18n.global.t('globalMessages.unknownApiError'),
  }
};

/**
 * @type {Boolean} Holds a flag if local and session storage are available.
 * They can lead to exceptions if cookies are disabled on the client.
 */
export const IS_STORAGE_AVAILABLE = (function isStorageAvailable() {
  const keyValue = '__storage_test__';

  try {
    const storage = window.localStorage;

    storage.setItem(keyValue, keyValue);
    storage.removeItem(keyValue);

    return true;
  } catch (error) {
    return false;
  }
}());
