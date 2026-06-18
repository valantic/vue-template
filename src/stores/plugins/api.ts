import { PAGE_LANG } from '@/setup/i18n';
import notificationStore, { mapApiResponseMessages } from '@/stores/notification';
import { ApiResponseMessages } from '@/types/api-response';
import { FetchError, FetchResponse, RequestConfig, createFetchInstance, isAbortError } from './api-request-helper';

/**
 * Standard API interface for the Pinia plugin.
 */
export type Api = {
  /**
   * Performs a GET request.
   *
   * @template T - The type of the response data.
   * @param url - The request URL.
   * @param config - Optional request configuration. Includes `uniqueId` for cancellation.
   * @returns A promise resolving to the fetch response.
   */
  get<T = unknown>(url: string, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>>;

  /**
   * Performs a POST request.
   *
   * @template T - The type of the response data.
   * @param url - The request URL.
   * @param data - Optional request payload.
   * @param config - Optional request configuration. Includes `uniqueId` for cancellation.
   * @returns A promise resolving to the fetch response.
   */
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig & { uniqueId?: string },
  ): Promise<FetchResponse<T>>;

  /**
   * Performs a PATCH request.
   *
   * @template T - The type of the response data.
   * @param url - The request URL.
   * @param data - Optional request payload.
   * @param config - Optional request configuration. Includes `uniqueId` for cancellation.
   * @returns A promise resolving to the fetch response.
   */
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig & { uniqueId?: string },
  ): Promise<FetchResponse<T>>;

  /**
   * Performs a PUT request.
   *
   * @template T - The type of the response data.
   * @param url - The request URL.
   * @param data - Optional request payload.
   * @param config - Optional request configuration. Includes `uniqueId` for cancellation.
   * @returns A promise resolving to the fetch response.
   */
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig & { uniqueId?: string },
  ): Promise<FetchResponse<T>>;

  /**
   * Performs a DELETE request.
   *
   * @template T - The type of the response data.
   * @param url - The request URL.
   * @param config - Optional request configuration. Includes `uniqueId` for cancellation.
   * @returns A promise resolving to the fetch response.
   */
  delete<T = unknown>(url: string, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>>;
};

/**
 * Global fetch instance used by the API plugin.
 */
export const fetchInstance = createFetchInstance();
fetchInstance.defaults.headers.common.locale = PAGE_LANG;

/**
 * Plugin API object structure.
 */
type PluginApi = {
  $api: Api;
};

/**
 * Common structure for API response data containing messages.
 */
type ApiErrorData = {
  messages?: ApiResponseMessages;
};

declare module 'pinia' {
  export interface PiniaCustomProperties {
    /**
     * Access the API plugin from within a Pinia store.
     */
    $api: Api;
  }
}

/**
 * Pinia plugin that provides a standardized API client with notification handling.
 *
 * @returns The plugin object.
 */
export default function api(): PluginApi {
  const notificationStoreInstance = notificationStore();
  const abortStack: Record<string, AbortController> = {};

  /**
   * Shows notifications from the API response.
   *
   * @param messages - The messages to display.
   */
  function showNotifications(messages: ApiResponseMessages): void {
    mapApiResponseMessages(messages).forEach((element) => {
      notificationStoreInstance.showNotification(element);
    });
  }

  /**
   * Processes a successful response and shows notifications if present.
   *
   * @template T - The type of the response data.
   * @param response - The fetch response.
   * @returns The processed response.
   */
  function handleSuccess<T>(response: FetchResponse<T>): FetchResponse<T> {
    const { messages } = (response?.data as ApiErrorData) || {};

    if (messages) {
      showNotifications(messages);
    }

    return response;
  }

  /**
   * Processes a failed request, shows notifications or errors, and rejects the promise.
   *
   * @template T - The type of the response data.
   * @param error - The fetch error.
   * @returns A rejected promise.
   */
  function handleError<T>(error: FetchError<T>): Promise<never> {
    const { messages } = (error?.response?.data as ApiErrorData) || {};

    if (messages) {
      showNotifications(messages);
    } else if (!isAbortError(error)) {
      // Don't show a message for aborted requests — these are mostly triggered by navigation
      // changes and don't require user feedback.
      notificationStoreInstance.showUnknownError();
    }

    return Promise.reject(error);
  }

  /**
   * Internal options for wrapRequest.
   */
  type WrapRequestOptions<T> = {
    method(url: string, ...arguments_: unknown[]): Promise<FetchResponse<T>>;
    url: string;
    arguments_: unknown[];
    config?: RequestConfig & { uniqueId?: string };
  };

  /**
   * Wrapper function to handle uniqueId logic and response processing.
   *
   * @template T - The type of the response data.
   * @param options - Request options.
   * @returns A promise resolving to the fetch response.
   */
  async function wrapRequest<T>(options: WrapRequestOptions<T>): Promise<FetchResponse<T>> {
    const { method, url, arguments_, config } = options;
    const uniqueId = config?.uniqueId;

    if (uniqueId) {
      const abortController = abortStack[uniqueId];

      if (abortController) {
        abortController.abort();
      }

      abortStack[uniqueId] = new AbortController();

      // Ensure we don't overwrite the signal if it's already provided in config
      if (config && !config.signal) {
        config.signal = abortStack[uniqueId].signal;
      }
    }

    try {
      // Re-assemble args with updated config if needed
      const requestArguments = [...arguments_];

      if (config) {
        if (requestArguments.length > 0 && typeof requestArguments.at(-1) === 'object') {
          requestArguments[requestArguments.length - 1] = config;
        } else {
          requestArguments.push(config);
        }
      }

      const response = await method(url, ...requestArguments);

      if (uniqueId) {
        delete abortStack[uniqueId];
      }

      return handleSuccess(response);
    } catch (error) {
      if (uniqueId && isAbortError(error)) {
        // If it's an abort error, we might not want to delete it from stack if a new one was already created
        // but since we check uniqueId before creating, it should be fine.
        delete abortStack[uniqueId];
      }

      if (isAbortError(error)) {
        throw error;
      }

      return await handleError(error as FetchError<T>);
    }
  }

  return {
    $api: {
      get<T>(url: string, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>> {
        return wrapRequest({
          method: fetchInstance.get.bind(fetchInstance) as WrapRequestOptions<T>['method'],
          url,
          arguments_: [config],
          config,
        });
      },

      post<T>(url: string, data?: unknown, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>> {
        return wrapRequest({
          method: fetchInstance.post.bind(fetchInstance) as WrapRequestOptions<T>['method'],
          url,
          arguments_: [data, config],
          config,
        });
      },

      put<T>(url: string, data?: unknown, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>> {
        return wrapRequest({
          method: fetchInstance.put.bind(fetchInstance) as WrapRequestOptions<T>['method'],
          url,
          arguments_: [data, config],
          config,
        });
      },

      patch<T>(url: string, data?: unknown, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>> {
        return wrapRequest({
          method: fetchInstance.patch.bind(fetchInstance) as WrapRequestOptions<T>['method'],
          url,
          arguments_: [data, config],
          config,
        });
      },

      delete<T>(url: string, config?: RequestConfig & { uniqueId?: string }): Promise<FetchResponse<T>> {
        return wrapRequest({
          method: fetchInstance.delete.bind(fetchInstance) as WrapRequestOptions<T>['method'],
          url,
          arguments_: [config],
          config,
        });
      },
    },
  };
}
