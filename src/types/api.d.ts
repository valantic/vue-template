/**
 * Neutral per-request options. Deliberately has no `data`/`body` field — request bodies are
 * passed as an explicit argument to the transport helper, so there is exactly one way to send one.
 */
export type ApiRequestConfig = {
  /** Extra headers merged on top of the request's default headers, caller values winning. */
  headers?: Record<string, string>;
  /** Serialized into the outgoing URL's query string, never sent as a request body. */
  params?: Record<string, unknown>;
  /** Caller-supplied abort signal, combined with the timeout signal into a single signal. */
  signal?: AbortSignal;
  /** Milliseconds before the request is aborted; `0` disables the timeout. */
  timeout?: number;
  /** Passed through to `fetch` untouched. */
  // eslint-disable-next-line no-undef -- `RequestCredentials` is a type-only DOM lib global, not a runtime value, so it is unknown to eslint's `no-undef`.
  credentials?: RequestCredentials;
  /** Passed through to `fetch` untouched. */
  // eslint-disable-next-line no-undef -- `RequestMode` is a type-only DOM lib global, not a runtime value, so it is unknown to eslint's `no-undef`.
  mode?: RequestMode;
  /** Passed through to `fetch` untouched. */
  // eslint-disable-next-line no-undef -- `RequestCache` is a type-only DOM lib global, not a runtime value, so it is unknown to eslint's `no-undef`.
  cache?: RequestCache;
  /** Passed through to `fetch` untouched. */
  // eslint-disable-next-line no-undef -- `RequestRedirect` is a type-only DOM lib global, not a runtime value, so it is unknown to eslint's `no-undef`.
  redirect?: RequestRedirect;
  /** Passed through to `fetch` untouched. */
  // eslint-disable-next-line no-undef -- `ReferrerPolicy` is a type-only DOM lib global, not a runtime value, so it is unknown to eslint's `no-undef`.
  referrerPolicy?: ReferrerPolicy;
};

/**
 * The HTTP-level response wrapper returned by every `Api` method.
 */
export type ApiResult<Data = unknown> = {
  /** Parsed response body. Typed `unknown` rather than `any` — consumers must narrow it themselves. */
  data: Data;
  /** HTTP status code. */
  status: number;
  /** HTTP status text. */
  statusText: string;
  /** Raw response headers. */
  headers: Headers;
  /** `true` when the status is in the 2xx range. */
  ok: boolean;
};

/**
 * The return type every `Api` method uses.
 */
export type ApiPromise<Data = unknown> = Promise<ApiResult<Data>>;

/**
 * Structural contract of a rejection thrown by the transport helper.
 */
export type ApiErrorShape = {
  /** Error name, e.g. `ApiError`. */
  name: string;
  /** Human-readable error message. */
  message: string;
  /** HTTP status code, when the rejection was caused by a non-2xx response. */
  status?: number;
  /** Machine-readable error code, when available. */
  code?: string;
  /** Parsed error response, when the rejection was caused by a non-2xx response. `response.data` is what the error handler reads `messages` from. */
  response?: ApiResult;
};
