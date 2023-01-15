import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import notificationStore, { INotificationItem } from '../notification';

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
    },
  };
}
