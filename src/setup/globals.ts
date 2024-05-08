import { ImageSizes } from '@/types/sizes';

/**
 * @type {object} Lookup table of available breakpoints.
 *
 * Keep in sync with SCSS variables!
 */
export const BREAKPOINTS = {
  // Keep in sync with SCSS variables!
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
};

/**
 * @type {object} Lookup table of available breakpoints max values.
 */
export const BREAKPOINTS_MAX = {
  xxs: BREAKPOINTS.xs - 1,
  xs: BREAKPOINTS.sm - 1,
  sm: BREAKPOINTS.md - 1,
  md: BREAKPOINTS.lg - 1,
  lg: BREAKPOINTS.xl - 1,
};

export type ViewportBreakPoint = keyof typeof BREAKPOINTS;

/**
 * @type {number} Global resize debounce value.
 */
export const RESIZE_DEBOUNCE = 100;

/**
 * Defines possible link target values.
 */
export enum LinkTarget {
  Self = '_self',
  Blank = '_blank',
  // Only add additional types if required.
}

/**
 * Default responsive image sizes.
 */
export const DEFAULT_IMAGE_SIZES: ImageSizes = {
  ...BREAKPOINTS_MAX,
  fallback: 1440,
};

/**
 * Contains list of all Pinia stores.
 */
export enum Store {
  Session = 'session',
  Breadcrumb = 'breadcrumb',
  Notification = 'notification',
}

/**
 * @type {boolean} Holds a flag if local and session storage are available.
 * They can lead to exceptions if cookies are disabled on the client.
 */
export const IS_STORAGE_AVAILABLE = (function isStorageAvailable(): boolean {
  const keyValue = '__storage_test__';

  try {
    const storage = window.localStorage;

    storage.setItem(keyValue, keyValue);
    storage.removeItem(keyValue);

    return true;
  } catch (error) {
    return false;
  }
})();

/**
 * Contains list of API response messages.
 */
export enum ApiResponseMessageAction {
  Redirect = 'REDIRECT',
  PageReload = 'PAGE_RELOAD',
}

/**
 * Holds all window storage keys used in the application.
 */
export enum WindowsStorage {
  Notifications = 'appNotifications',
}
