/**
 * Configuration for a fetch request.
 */
export type RequestConfig = {
  /**
   * Additional headers to be sent with the request.
   */
  headers?: Record<string, string>;
  /**
   * Query parameters to be appended to the URL.
   */
  params?: Record<string, unknown>;
  /**
   * An AbortSignal to cancel the request.
   */
  signal?: AbortSignal;
  /**
   * The expected response type. Defaults to 'json'.
   */
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
};

/**
 * Standardized response object for all fetch requests.
 *
 * @template T - The type of the response data.
 */
export type FetchResponse<T = unknown> = {
  /**
   * The parsed response data.
   */
  data: T;
  /**
   * HTTP status code.
   */
  status: number;
  /**
   * HTTP status text.
   */
  statusText: string;
  /**
   * Response headers.
   */
  headers: Record<string, string>;
  /**
   * The original request configuration.
   */
  config: RequestConfig;
};

/**
 * Error thrown when a fetch request fails with a non-2xx status or a network error.
 *
 * @template T - The type of the response data in case of an error.
 */
export class FetchError<T = unknown> extends Error {
  /**
   * The parsed response that triggered the error, if any.
   */
  response?: FetchResponse<T>;
  /**
   * An optional error code (e.g. 'ABORT').
   */
  code?: string;

  /**
   * @param message - Human-readable error description.
   * @param response - The parsed response that triggered the error, if any.
   * @param code - An optional error code (e.g. 'ABORT').
   */
  constructor(message: string, response?: FetchResponse<T>, code?: string) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
    this.code = code;
  }
}

/**
 * Checks if the given error is an AbortError.
 *
 * @param error - The error to check.
 * @returns True if it's an AbortError.
 */
export function isAbortError(error: unknown): boolean {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return true;
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return true;
  }

  return (error as FetchError)?.code === 'ABORT';
}

/**
 * Interface for the fetch instance.
 */
type FetchInstance = {
  /**
   * Global defaults for the instance.
   */
  defaults: { headers: { common: Record<string, string> } };
  /**
   * Performs a GET request.
   */
  get<T = unknown>(url: string, config?: RequestConfig): Promise<FetchResponse<T>>;
  /**
   * Performs a POST request.
   */
  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<FetchResponse<T>>;
  /**
   * Performs a PATCH request.
   */
  patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<FetchResponse<T>>;
  /**
   * Performs a PUT request.
   */
  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<FetchResponse<T>>;
  /**
   * Performs a DELETE request.
   */
  delete<T = unknown>(url: string, config?: RequestConfig): Promise<FetchResponse<T>>;
};

/**
 * Internal options for the request function.
 */
type InternalRequestOptions = {
  method: string;
  data?: unknown;
  config?: RequestConfig;
};

/**
 * Creates a new fetch instance with standardized methods and default configurations.
 *
 * @returns A fetch instance.
 */
export function createFetchInstance(): FetchInstance {
  const defaults = {
    headers: {
      common: {} as Record<string, string>,
    },
  };

  /**
   * Central request function that handles URL construction, headers, and response parsing.
   *
   * @template T - The expected response data type.
   * @param url - The request URL.
   * @param options - Request options including method, data, and config.
   * @returns A promise resolving to a standardized FetchResponse.
   */
  async function request<T>(url: string, options: InternalRequestOptions): Promise<FetchResponse<T>> {
    const { method, data, config } = options;
    let fullUrl = url;

    if (config?.params) {
      const definedEntries = Object.entries(config.params).filter(([, value]) => value !== undefined && value !== null);

      if (definedEntries.length) {
        const searchParameters = new URLSearchParams(
          definedEntries.map(([key, value]) => [key, String(value)]),
        ).toString();

        fullUrl = `${url}${url.includes('?') ? '&' : '?'}${searchParameters}`;
      }
    }

    const headers: Record<string, string> = {
      ...defaults.headers.common,
      ...config?.headers,
    };

    if (data !== undefined && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    let response: Response;

    try {
      response = await fetch(fullUrl, {
        method,
        headers,
        signal: config?.signal,
        body: data === undefined ? undefined : JSON.stringify(data),
      });
    } catch (error) {
      if (isAbortError(error)) {
        throw new FetchError('Request aborted', undefined, 'ABORT');
      }

      throw error;
    }

    const contentType = response.headers.get('content-type') ?? '';
    let responseData: T;

    try {
      switch (config?.responseType) {
        case 'text':
          responseData = (await response.text()) as unknown as T;

          break;

        case 'blob':
          responseData = (await response.blob()) as unknown as T;

          break;

        case 'arraybuffer':
          responseData = (await response.arrayBuffer()) as unknown as T;

          break;

        case 'json':
          responseData = await response.json();

          break;

        default: {
          if (contentType.includes('application/json')) {
            responseData = await response.json();
          } else {
            const text = await response.text();

            try {
              responseData = JSON.parse(text);
            } catch {
              responseData = text as unknown as T;
            }
          }
          break;
        }
      }
    } catch {
      // Handle cases where response is empty or not valid according to responseType
      responseData = undefined as unknown as T;
    }

    const fetchResponse: FetchResponse<T> = {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      config: config ?? {},
    };

    if (!response.ok) {
      throw new FetchError<T>(`Request failed with status ${response.status}`, fetchResponse);
    }

    return fetchResponse;
  }

  return {
    defaults,
    get: (url, config) => request(url, { method: 'GET', config }),
    post: (url, data, config) => request(url, { method: 'POST', data, config }),
    patch: (url, data, config) => request(url, { method: 'PATCH', data, config }),
    put: (url, data, config) => request(url, { method: 'PUT', data, config }),
    delete: (url, config) => request(url, { method: 'DELETE', config }),
  };
}
