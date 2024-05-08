import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { PAGE_LANG } from '@/setup/i18n';
import notificationStore, { mapApiResponseMessages } from '@/stores/notification';
import { ApiResponseMessages } from '@/types/api-response';

export type Api = {
  /**
   * Runs a get request with given url with given url params.
   */
  get(url: string, config?: AxiosRequestConfig, uniqueId?: string): AxiosPromise;

  /**
   * Runs a post request with a given url and payload.
   */
  post(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise;

  /**
   * Runs a patch request with a given url and payload.
   */
  patch(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise;

  /**
   * Runs a put request with a given url and payload.
   */
  put(url: string, data?: object, config?: AxiosRequestConfig, uniqueId?: string): AxiosPromise;

  /**
   * Runs a delete request with a given url and payload.
   */
  delete(url: string, config: AxiosRequestConfig): AxiosPromise;
};

// Creating an Axios instance to set general header properties (for each request)
export const axiosInstance: AxiosInstance = axios.create({
  headers: {
    common: {
      locale: PAGE_LANG,
    },
  },
});

type PluginApi = {
  $api: Api;
};

type ApiError = AxiosError & {
  messages: ApiResponseMessages;
};

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: Api;
  }
}

export default function api(): PluginApi {
  const notificationStoreInstance = notificationStore();
  const abortStack: Record<string, AbortController> = {};

  /**
   * Pushes an array of messages to the notification handler.
   */
  function showNotifications(messages: ApiResponseMessages): void {
    mapApiResponseMessages(messages).forEach(notificationStoreInstance.showNotification);
  }

  /**
   * Handles successful ajax requests.
   */
  function handleSuccess(response: AxiosResponse): AxiosResponse {
    const { messages } = response?.data || {};

    if (messages) {
      showNotifications(messages);
    }

    return response || {};
  }

  /**
   * Handles axios error responses.
   */
  function handleError(error: AxiosError<ApiError>): AxiosPromise<AxiosError> {
    const { messages } = error?.response?.data || {};

    if (messages) {
      showNotifications(messages);
    } else {
      notificationStoreInstance.showUnknownError();
    }

    return Promise.reject(error);
  }

  return {
    $api: {
      get(url, config, uniqueId): AxiosPromise {
        if (uniqueId) {
          const abortController = abortStack[uniqueId];

          if (abortController) {
            abortController.abort();
          }

          abortStack[uniqueId] = new AbortController();
          config = {
            ...config,
            signal: abortStack[uniqueId]?.signal,
          };
        }

        return axiosInstance
          .get(url, config)
          .then((response) => {
            if (uniqueId) {
              delete abortStack[uniqueId];
            }

            return handleSuccess(response);
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              return Promise.reject(error);
            }

            return handleError(error);
          });
      },

      post(url, data, config): AxiosPromise {
        return axiosInstance
          .post(url, data, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },

      put(url, data, config): AxiosPromise {
        return axiosInstance
          .post(url, data, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },

      patch(url, data, config): AxiosPromise {
        return axiosInstance
          .patch(url, data, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },

      delete(url, config): AxiosPromise {
        return axiosInstance
          .delete(url, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },
    },
  };
}
