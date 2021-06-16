import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store/index';
import apiUrls from '@/setup/apiUrls.json';

interface IUrlKeyValues {
  [key: string]: string;
}

// Enable tracking of requests in development environment.
if (process.env.NODE_ENV !== 'production') {
  const clone = require('@/helpers/clone.ts').default; // eslint-disable-line global-require
  const exclude = [
    /assets\//,
  ];

  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!exclude.find(pattern => pattern.test(config.url || ''))) {
      console.groupCollapsed(`=> ${config.method?.toUpperCase()} ${config.url}`); // eslint-disable-line no-console
      console.dir(clone(config)); // eslint-disable-line no-console
      console.groupEnd(); // eslint-disable-line no-console
    }

    return config;
  });

  axios.interceptors.response.use((response: AxiosResponse) => {
    if (!exclude.find(pattern => pattern.test(response.config.url || ''))) {
      console.groupCollapsed(`<= ${response.config.method?.toUpperCase()} ${response.config.url}`); // eslint-disable-line no-console
      console.dir(clone(response)); // eslint-disable-line no-console
      console.groupEnd(); // eslint-disable-line no-console
    }

    return response;
  });
}

/**
 * Pushes an array of messages to the notification handler.
 *
 * @param {Array} messages - An array of messages.
 * @param {Object} options - Display options for the notifications.
 */
function showNotifications(messages: string[], options: object): void {
  if (!Array.isArray(messages)) {
    return;
  }

  messages.forEach((message) => {
    store.commit('notification/pushNotification', {
      ...options,
      message,
    });
  });
}

/**
 * Handles successful ajax requests.
 *
 * @param {Object} response - Response object.
 * @param {Object} options - Display options for notification.
 *
 * @returns {Object}
 */
function handleSuccess(response: AxiosResponse, options: object): AxiosResponse {
  const { messages } = response?.data || {};

  if (messages) {
    showNotifications(messages, options);
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
function handleError(error: AxiosError, options: object): Promise<AxiosError> {
  const { messages } = error?.response?.data || {};

  if (messages) {
    showNotifications(messages, options);
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
  getUrl(urlKey: keyof typeof apiUrls, values: IUrlKeyValues): string {
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
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  get(url: string, config: AxiosRequestConfig, notificationOptions: object): Promise<AxiosResponse<any> | AxiosError<any>> {
    return axios
      .get(url, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a post request with a given url and payload.
   *
   * @param {String} url - Url to post to.
   * @param {Object} data - Post payload which will be attached to the request.
   * @param {Object} config - Axios request configuration.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  post(url: string, data: object, config: AxiosRequestConfig, notificationOptions: object): Promise<AxiosResponse<any> | AxiosError<any>> { // eslint-disable-line max-params
    return axios
      .post(url, data, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a patch request with a given url and payload.
   *
   * @param {String} url - Url to patch to.
   * @param {Object} data - Patch payload which will be attached to the request.
   * @param {Object} config - Axios request configuration.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  patch(url: string, data: object, config: AxiosRequestConfig, notificationOptions: object): Promise<AxiosResponse<any> | AxiosError<any>> { // eslint-disable-line max-params
    return axios
      .patch(url, data, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a delete request with a given url and payload.
   *
   * @param {String} url - Url to send the delete to.
   * @param {Object} config - Axios request configuration.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  delete(url: string, config: AxiosRequestConfig, notificationOptions: object): Promise<AxiosResponse<any> | AxiosError<any>> { // eslint-disable-line max-params
    return axios
      .delete(url, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },
};
