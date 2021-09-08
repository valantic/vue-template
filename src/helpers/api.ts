import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store/index';
import apiUrls from '@/setup/api-urls.json';
import { IMessage, INotification } from '@/types/c-notification';

interface IUrlKeyValues {
  [key: string]: string;
}

export interface IApi {
  getUrl: (urlKey: keyof typeof apiUrls, values: IUrlKeyValues) => string;
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  get: (url: string, config: AxiosRequestConfig, notificationOptions: INotification) => Promise<AxiosResponse<any> | AxiosError<any>>;
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  post: (url: string, data?: object, config?: AxiosRequestConfig, notificationOptions?: INotification) => Promise<AxiosResponse<any> | AxiosError<any>>;
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  patch: (url: string, data: object, config: AxiosRequestConfig, notificationOptions: INotification) => Promise<AxiosResponse<any> | AxiosError<any>>;
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  delete: (url: string, config: AxiosRequestConfig, notificationOptions: INotification) => Promise<AxiosResponse<any> | AxiosError<any>>;
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
 */
function showNotifications(messages: IMessage[], options?: INotification): void {
  if (!Array.isArray(messages)) {
    return;
  }

  messages.forEach((message) => {
    store.commit.notification.pushNotification({
      ...options,
      message,
    });
  });
}

/**
 * Handles successful ajax requests.
 *
 * @returns {Object}
 */
function handleSuccess(response: AxiosResponse, options?: INotification): AxiosResponse {
  const { messages } = response?.data || {};

  if (messages) {
    showNotifications(messages, options);
  }

  return response || {};
}

/**
 * Handles axios error responses.
 */
function handleError(error: AxiosError, options?: INotification): Promise<AxiosError> {
  const { messages } = error?.response?.data || {};

  if (messages) {
    showNotifications(messages, options);
  } else {
    store.dispatch.notification.showUnknownError();
  }

  return Promise.reject(error);
}

const api: IApi = {
  /**
   * Gets the url for the given 'urlKey'. The method also accepts an Object of interpolation values.
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
   */
  // eslint-disable-next-line max-len,@typescript-eslint/no-explicit-any
  get(url: string, config: AxiosRequestConfig, notificationOptions: INotification): Promise<AxiosResponse<any> | AxiosError<any>> {
    return axios
      .get(url, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a post request with a given url and payload.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  post(url: string, data?: object, config?: AxiosRequestConfig, notificationOptions?: INotification): Promise<AxiosResponse<any> | AxiosError<any>> { // eslint-disable-line max-params
    return axios
      .post(url, data, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a patch request with a given url and payload.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  patch(url: string, data: object, config: AxiosRequestConfig, notificationOptions: INotification): Promise<AxiosResponse<any> | AxiosError<any>> { // eslint-disable-line max-params
    return axios
      .patch(url, data, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a delete request with a given url and payload.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
  delete(url: string, config: AxiosRequestConfig, notificationOptions: INotification): Promise<AxiosResponse<any> | AxiosError<any>> { // eslint-disable-line max-params
    return axios
      .delete(url, config)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },
};

export default api;
