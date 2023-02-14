import axios, {
 AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance,
} from 'axios';
import notificationStore, { INotificationItem } from '@/stores/notification';
import { PAGE_LANG } from '@/setup/i18n';

export interface IApi {

  /**
   * Runs a get request with given url with given url params.
   */
  get: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;

  /**
   * Runs a post request with a given url and payload.
   */
  post: (url: string, data?: object, config?: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;

  /**
   * Runs a patch request with a given url and payload.
   */
  patch: (url: string, data?: object, config?: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;

  /**
   * Runs a delete request with a given url and payload.
   */
  delete: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse | AxiosError>;
}

// Creating an Axios instance to set general header properties (for each request)
export const axiosInstance: AxiosInstance = axios.create({
  headers: {
    common: {
      locale: PAGE_LANG,
    },
  },
});

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
      get(url, config): Promise<AxiosResponse | AxiosError> {
        return axiosInstance
          .get(url, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      post(url, data, config): Promise<AxiosResponse | AxiosError> {
        return axiosInstance
          .post(url, data, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      patch(url, data, config): Promise<AxiosResponse | AxiosError> {
        return axiosInstance
          .patch(url, data, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },

      delete(url, config): Promise<AxiosResponse | AxiosError> {
        return axiosInstance
          .delete(url, config)
          .then(response => handleSuccess(response))
          .catch(error => handleError(error));
      },
    },
  };
}
