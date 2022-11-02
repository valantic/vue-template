import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import notificationStore, { INotificationItem } from '@/stores/notification';

export interface IApi {

  /**
   * Runs a get request with given url with given url params.
   */
  get: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;

  /**
   * Runs a post request with a given url and payload.
   */
  post: (url: string, data?: object, config?: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;

  /**
   * Runs a patch request with a given url and payload.
   */
  patch: (url: string, data: object, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;

  /**
   * Runs a delete request with a given url and payload.
   */
  delete: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;
}

interface IPluginApi {
  $api: IApi,
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: IApi
  }
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

export default function api():IPluginApi {
  const notificationStoreInstance = notificationStore();

  /**
   * Pushes an array of messages to the notification handler.
   */
  function showNotifications(notifications: INotificationItem[]): void {
    if (!Array.isArray(notifications)) {
      return;
    }

    notifications.forEach(notificationStoreInstance.showNotification);
  }

  /**
   * Handles successful ajax requests.
   */
  function handleSuccess(response: AxiosResponse): AxiosResponse {
    const { notifications } = response?.data || {};

    if (notifications) {
      showNotifications(notifications);
    }

    return response || {};
  }

  /**
   * Handles axios error responses.
   */
  function handleError(error: AxiosError<any>): Promise<AxiosError> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { notifications } = error?.response?.data || {};

    if (notifications) {
      showNotifications(notifications);
    } else {
      notificationStoreInstance.showUnknownError();
    }

    return Promise.reject(error);
  }

  return {
    $api: {
      get(url, config) {
        return axios
          .get(url, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      post(url, data, config) {
        return axios
          .post(url, data, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      patch(url, data, config) {
        return axios
          .patch(url, data, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      delete(url, config) {
        return axios
          .delete(url, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },
    }
  };
}
