import { PAGE_LANG } from '@/setup/i18n';
import notificationStore, { mapApiResponseMessages } from '@/stores/notification';
import { apiRequest, isSilentAbortError } from '@/helpers/api-request';
import { ApiErrorShape, ApiPromise, ApiRequestConfig, ApiResult } from '@/types/api';
import { ApiResponse, ApiResponseMessages } from '@/types/api-response';

export type Api = {
  /**
   * Runs a get request with given url with given url params.
   */
  get(url: string, config?: ApiRequestConfig, uniqueId?: string): ApiPromise;

  /**
   * Runs a post request with a given url and payload.
   */
  post(url: string, data?: object, config?: ApiRequestConfig): ApiPromise;

  /**
   * Runs a patch request with a given url and payload.
   */
  patch(url: string, data?: object, config?: ApiRequestConfig): ApiPromise;

  /**
   * Runs a put request with a given url and payload.
   */
  put(url: string, data?: object, config?: ApiRequestConfig, uniqueId?: string): ApiPromise;

  /**
   * Runs a delete request with a given url and payload.
   */
  delete(url: string, config: ApiRequestConfig): ApiPromise;
};

/**
 * General header properties sent with every request. Mutable by design: the object is read at call
 * time by each request, so a later locale switch takes effect on all subsequent requests.
 * Seeded with the raw `PAGE_LANG` value, unvalidated, exactly as before.
 */
const defaultHeaders: Record<string, string> = {
  locale: PAGE_LANG,
};

/**
 * Sets the `locale` header sent with every subsequent request.
 */
export function setApiLocale(locale: string): void {
  defaultHeaders.locale = locale;
}

/**
 * Issues a request through the transport helper with the shared default headers applied. Kept at
 * two parameters, and at module scope alongside `defaultHeaders`, to satisfy the project's
 * `max-params` and `unicorn/consistent-function-scoping` rules.
 */
function request(options: { method: string; url: string; data?: unknown }, config?: ApiRequestConfig): ApiPromise {
  return apiRequest({ ...options, defaultHeaders }, config);
}

type PluginApi = {
  $api: Api;
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
    mapApiResponseMessages(messages).forEach((element) => {
      notificationStoreInstance.showNotification(element);
    });
  }

  /**
   * Handles successful ajax requests.
   */
  function handleSuccess(response: ApiResult): ApiResult {
    const { messages } = (response?.data ?? {}) as ApiResponse;

    if (messages) {
      showNotifications(messages);
    }

    return response;
  }

  /**
   * Handles rejected requests.
   */
  function handleError(error: unknown): ApiPromise {
    const { messages } = ((error as ApiErrorShape)?.response?.data ?? {}) as ApiResponse;

    if (messages) {
      showNotifications(messages);
    } else if (!isSilentAbortError(error)) {
      // We don't show a message if the request was aborted or ran into its timeout, as this is
      // mostly triggered by navigation changes and the user doesn't need to be informed about this.
      // If there are no messages in the response we show a generic error message.
      notificationStoreInstance.showUnknownError();
    }

    return Promise.reject(error);
  }

  return {
    $api: {
      get(url, config, uniqueId): ApiPromise {
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

        return request({ method: 'GET', url }, config)
          .then((response) => {
            if (uniqueId) {
              delete abortStack[uniqueId];
            }

            return handleSuccess(response);
          })
          .catch((error) => {
            if (isSilentAbortError(error)) {
              throw error;
            }

            return handleError(error);
          });
      },

      post(url, data, config): ApiPromise {
        return request({ method: 'POST', url, data }, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },

      // KNOWN DEFECT, INTENTIONALLY PRESERVED: `put()` issues an HTTP POST, not a PUT. This is
      // ported unchanged from the previous implementation so that this migration stays a pure
      // dependency swap with no behaviour change. It is a real bug and must not be relied upon;
      // the follow-up is tracked under "Out of Scope" in `.planning/PROJECT.md`. The `uniqueId`
      // parameter declared on the `Api` type is likewise ignored here, exactly as before.
      put(url, data, config): ApiPromise {
        return request({ method: 'POST', url, data }, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },

      patch(url, data, config): ApiPromise {
        return request({ method: 'PATCH', url, data }, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },

      delete(url, config): ApiPromise {
        return request({ method: 'DELETE', url }, config)
          .then((response) => handleSuccess(response))
          .catch((error) => handleError(error));
      },
    },
  };
}
