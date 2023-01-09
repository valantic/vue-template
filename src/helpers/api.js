import axios from 'axios';
import store from '@/store/index';
import apiUrls from '@/setup/api-urls.json';
import { i18n } from '@/setup/i18n';

// DRY: Define axios instance with custom config applied to all requests.
export const axiosInstance = axios.create({
  locale: i18n.locale,
});

// Enable tracking of requests in development environment.
if (process.env.NODE_ENV !== 'production') {
  const clone = require('@/helpers/clone.js').default; // eslint-disable-line global-require
  const exclude = [
    /assets\//,
  ];

  axiosInstance.interceptors.request.use((config) => {
    if (!exclude.find(pattern => pattern.test(config.url))) {
      console.groupCollapsed(`=> ${config.method.toUpperCase()} ${config.url}`); // eslint-disable-line no-console
      console.dir(clone(config)); // eslint-disable-line no-console
      console.groupEnd(); // eslint-disable-line no-console
    }

    return config;
  });

  axiosInstance.interceptors.response.use((response) => {
    if (!exclude.find(pattern => pattern.test(response.config.url))) {
      console.groupCollapsed(`<= ${response.config.method.toUpperCase()} ${response.config.url}`); // eslint-disable-line no-console
      console.dir(clone(response)); // eslint-disable-line no-console
      console.groupEnd(); // eslint-disable-line no-console
    }

    return response;
  });
}

/**
 * Pushes an array of messages to the notification handler.
 *
 * @param {Array.<Object>} notifications - An array of messages.
 */
function showNotifications(notifications) {
  if (!Array.isArray(notifications)) {
    return;
  }
  notifications.forEach((notification) => {
    store.commit('notification/pushNotification', notification);
  });
}

/**
 * Handles successful ajax requests.
 *
 * @param {Object} response - Response object.
 *
 * @returns {Object}
 */
function handleSuccess(response) {
  const { notifications } = response?.data || {};

  if (notifications) {
    showNotifications(notifications);
  }

  return response || {};
}

/**
 * Handles axios error responses.
 *
 * @param {Object} error - An axios error object.
 * @param {Object} error.response - The response data.
 * @param {Object} options - Additional request options.
 *
 * @returns {Promise<never>}
 */
function handleError(error, options) {
  const { notifications } = error?.response?.data || {};

  if (notifications) {
    showNotifications(notifications, options);
  } else {
    store.dispatch('notification/showUnknownError');
  }

  return Promise.reject(error);
}

export default {
  /**
   * Gets the url for the given 'urlKey'. The method also accepts an Object of interpolation values.
   *
   * @param {String} urlKey - The key for the requested url.
   * @param {Object} [values] - An Object of key/value pairs. The related '{key}' in the URL will be replaced with its value.
   *
   * @returns {String}
   */

  getUrl(urlKey, values) {
    let url = apiUrls[urlKey];

    if (!url) {
      throw new Error(`Unable to find an API url with the identifier ${urlKey}.`);
    }

    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        url = url.replace(`{${key}}`, value);
      });
    }

    return url;
  },

  /**
   * Runs a get request with given url with given url params.
   *
   * @param {String} url - Url to get.
   * @param {Object} config - Url parameters which will be attached to the url.
   *
   * @returns {Promise} Promise with response data or error.
   */

  get(url, config) {
    return axiosInstance
      .get(url, config)
      .then(response => handleSuccess(response))
      .catch(error => handleError(error));
  },

  /**
   * Runs a post request with a given url and payload.
   *
   * @param {String} url - Url to post to.
   * @param {Object} data - Post payload which will be attached to the request.
   * @param {Object} config - Axios request configuration.
   *
   * @returns {Promise} Promise with response data or error.
   */
  post(url, data, config) { // eslint-disable-line max-params
    return axiosInstance
      .post(url, data, config)
      .then(response => handleSuccess(response))
      .catch(error => handleError(error));
  },

  /**
   * Runs a patch request with a given url and payload.
   *
   * @param {String} url - Url to patch to.
   * @param {Object} data - Patch payload which will be attached to the request.
   * @param {Object} config - Axios request configuration.
   *
   * @returns {Promise} Promise with response data or error.
   */
  patch(url, data, config) { // eslint-disable-line max-params
    return axiosInstance
      .patch(url, data, config)
      .then(response => handleSuccess(response))
      .catch(error => handleError(error));
  },

  /**
   * Runs a delete request with a given url and payload.
   *
   * @param {String} url - Url to send the delete to.
   * @param {Object} config - Axios request configuration.
   *
   * @returns {Promise} Promise with response data or error.
   */
  delete(url, config) { // eslint-disable-line max-params
    return axiosInstance
      .delete(url, config)
      .then(response => handleSuccess(response))
      .catch(error => handleError(error));
  },
};
