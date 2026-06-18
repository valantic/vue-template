import { PAGE_LANG } from '@/setup/i18n';
import notificationStore, { mapApiResponseMessages } from '@/stores/notification';
import { ApiResponseMessages } from '@/types/api-response';
import { FetchError, FetchResponse, RequestConfig, createFetchInstance, isAbortError } from './api-request-helper';

export type Api = {
  /**
   * Runs a get request with given url with given url params.
   */
  get(url: string, config?: RequestConfig, uniqueId?: string): Promise<FetchResponse>;

  /**
   * Runs a post request with a given url and payload.
   */
  post(url: string, data?: object, config?: RequestConfig): Promise<FetchResponse>;

  /**
   * Runs a patch request with a given url and payload.
   */
  patch(url: string, data?: object, config?: RequestConfig): Promise<FetchResponse>;

  /**
   * Runs a put request with a given url and payload.
   */
  put(url: string, data?: object, config?: RequestConfig, uniqueId?: string): Promise<FetchResponse>;

  /**
   * Runs a delete request with a given url and payload.
   */
  delete(url: string, config?: RequestConfig): Promise<FetchResponse>;
};

export const fetchInstance = createFetchInstance();
fetchInstance.defaults.headers.common.locale = PAGE_LANG;

type PluginApi = {
  $api: Api;
};

type ApiErrorData = {
  messages?: ApiResponseMessages;
};

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: Api;
  }
}

export default function api(): PluginApi {
  const notificationStoreInstance = notificationStore();
  const abortStack: Record<string, AbortController> = {};

  function showNotifications(messages: ApiResponseMessages): void {
    mapApiResponseMessages(messages).forEach((element) => {
      notificationStoreInstance.showNotification(element);
    });
  }

  function handleSuccess(response: FetchResponse): FetchResponse {
    const { messages } = (response?.data as ApiErrorData) || {};

    if (messages) {
      showNotifications(messages);
    }

    return response || {};
  }

  function handleError(error: FetchError<ApiErrorData>): Promise<never> {
    const { messages } = error?.response?.data || {};

    if (messages) {
      showNotifications(messages);
    } else if (!isAbortError(error)) {
      // Don't show a message for aborted requests — these are mostly triggered by navigation
      // changes and don't require user feedback.
      notificationStoreInstance.showUnknownError();
    }

    return Promise.reject(error);
  }

  return {
    $api: {
      get(url, config, uniqueId): Promise<FetchResponse> {
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

        return fetchInstance
          .get(url, config)
          .then((response) => {
            if (uniqueId) {
              delete abortStack[uniqueId];
            }

            return handleSuccess(response);
          })
          .catch((error: unknown) => {
            if (isAbortError(error)) {
              throw error;
            }

            return handleError(error as FetchError<ApiErrorData>);
          });
      },

      async post(url, data, config): Promise<FetchResponse> {
        try {
          const response = await fetchInstance.post(url, data, config);

          return handleSuccess(response);
        } catch (error) {
          return await handleError(error as FetchError<ApiErrorData>);
        }
      },

      async put(url, data, config): Promise<FetchResponse> {
        try {
          const response = await fetchInstance.put(url, data, config);

          return handleSuccess(response);
        } catch (error) {
          return await handleError(error as FetchError<ApiErrorData>);
        }
      },

      async patch(url, data, config): Promise<FetchResponse> {
        try {
          const response = await fetchInstance.patch(url, data, config);

          return handleSuccess(response);
        } catch (error) {
          return await handleError(error as FetchError<ApiErrorData>);
        }
      },

      async delete(url, config): Promise<FetchResponse> {
        try {
          const response = await fetchInstance.delete(url, config);

          return handleSuccess(response);
        } catch (error) {
          return await handleError(error as FetchError<ApiErrorData>);
        }
      },
    },
  };
}
