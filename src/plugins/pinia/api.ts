import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import 'pinia';
import apiUrls from '@/setup/api-urls.json';
import { useNotificationStore, INotificationItem } from '@/stores/notification';

interface IUrlKeyValues {
  [key: string]: string;
}

export interface IApi {
  getUrl: (urlKey: keyof typeof apiUrls, values: IUrlKeyValues) => string;
  get: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;
  post: (url: string, data?: object, config?: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;
  patch: (url: string, data: object, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;
  delete: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;
}

export interface IPluginApi {
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
  const notificationStore = useNotificationStore();

  /**
   * Pushes an array of messages to the notification handler.
   */
  function showNotifications(notifications: INotificationItem[]): void {
    if (!Array.isArray(notifications)) {
      return;
    }

    notifications.forEach((notification) => {
      notificationStore.pushNotification(notification);
    });
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
  function handleError(error: AxiosError): Promise<AxiosError> {
    const { notifications } = error?.response?.data || {};

    if (notifications) {
      showNotifications(notifications);
    } else {
      notificationStore.showUnknownError();
    }

    return Promise.reject(error);
  }

  return {
    $api: {
      /**
       * Gets the url for the given 'urlKey'. The method also accepts an Object of interpolation values.
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
       */
      get(url, config) {
        return axios
          .get(url, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      /**
       * Runs a post request with a given url and payload.
       */
      // eslint-disable-next-line max-params
      post(url, data, config) {
        return axios
          .post(url, data, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      /**
       * Runs a patch request with a given url and payload.
       */
      // eslint-disable-next-line max-params
      patch(url, data, config) {
        return axios
          .patch(url, data, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      /**
       * Runs a delete request with a given url and payload.
       */
      // eslint-disable-next-line max-params
      delete(url, config) {
        return axios
          .delete(url, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },
    }
  };
}
