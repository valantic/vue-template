export type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
};

export type FetchResponse<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
};

/**
 * Error thrown when a fetch request fails with a non-2xx status or a network error.
 */
export class FetchError<T = unknown> extends Error {
  response?: FetchResponse<T>;
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

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

type FetchInstance = {
  defaults: { headers: { common: Record<string, string> } };
  get<T = unknown>(url: string, config?: RequestConfig): Promise<FetchResponse<T>>;
  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<FetchResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<FetchResponse<T>>;
  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<FetchResponse<T>>;
  delete<T = unknown>(url: string, config?: RequestConfig): Promise<FetchResponse<T>>;
};

type InternalRequestOptions = {
  method: string;
  data?: unknown;
  config?: RequestConfig;
};

export function createFetchInstance(): FetchInstance {
  const defaults = {
    headers: {
      common: {} as Record<string, string>,
    },
  };

  async function request<T>(url: string, options: InternalRequestOptions): Promise<FetchResponse<T>> {
    const { method, data, config } = options;
    let fullUrl = url;

    if (config?.params) {
      const definedEntries = Object.entries(config.params).filter(([, value]) => value !== undefined && value !== null);

      if (definedEntries.length) {
        fullUrl = `${url}?${new URLSearchParams(definedEntries.map(([key, value]) => [key, String(value)])).toString()}`;
      }
    }

    const headers: Record<string, string> = {
      ...defaults.headers.common,
      ...config?.headers,
    };

    if (data !== undefined && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(fullUrl, {
      method,
      headers,
      signal: config?.signal,
      body: data === undefined ? undefined : JSON.stringify(data),
    });

    const contentType = response.headers.get('content-type') ?? '';
    let responseData: T;

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
          try {
            responseData = await response.json();
          } catch {
            responseData = (await response.text()) as unknown as T;
          }
        }
        break;
      }
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
