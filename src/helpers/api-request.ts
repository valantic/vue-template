import { ApiErrorShape, ApiRequestConfig, ApiResult } from '@/types/api';

/**
 * Options describing the request itself, independent of the neutral per-request `ApiRequestConfig`.
 */
type ApiRequestOptions = {
  method: string;
  url: string;
  data?: unknown;
  defaultHeaders?: Record<string, string>;
};

/**
 * Default `Accept` header value, matching the previous client's shipped default (confirmed against
 * its defaults module; see the plan's Support evidence section).
 */
const DEFAULT_ACCEPT_HEADER = 'application/json, text/plain, */*';

/**
 * Default request timeout in milliseconds, applied unless a per-request `config.timeout` overrides
 * it; `0` disables the timeout. The previous client shipped with no default timeout at all, so this
 * is a deliberate addition mandated by REQ-04, not a port of prior behaviour.
 */
export const API_DEFAULT_TIMEOUT = 30_000;

/**
 * Real `Error` subclass rejected by `apiRequest` on a non-2xx response or a network failure,
 * carrying the parsed response body so callers can read `error.response.data`.
 */
export class ApiError extends Error implements ApiErrorShape {
  status?: number;

  code?: string;

  response?: ApiResult;

  /**
   * Creates an `ApiError` carrying the HTTP status and parsed response body, when available.
   */
  constructor(message: string, init?: { status?: number; code?: string; response?: ApiResult }) {
    super(message);

    this.name = 'ApiError';
    this.status = init?.status;
    this.code = init?.code;
    this.response = init?.response;
  }
}

/**
 * Returns `true` when `headers` already contains a header named `name`, compared case-insensitively.
 */
function hasHeader(headers: Record<string, string>, name: string): boolean {
  return Object.keys(headers).some((key) => key.toLowerCase() === name.toLowerCase());
}

/**
 * Returns `true` for values `fetch` accepts as a request body untouched, without JSON-encoding.
 */
function isRawBody(data: unknown): data is FormData | URLSearchParams | Blob | ArrayBuffer | ReadableStream | string {
  return (
    data instanceof FormData ||
    data instanceof URLSearchParams ||
    data instanceof Blob ||
    data instanceof ArrayBuffer ||
    data instanceof ReadableStream ||
    typeof data === 'string'
  );
}

/**
 * Serializes a params object into a query string (no leading `?`), matching the previous client's
 * params serializer: `undefined`/`null` entries are dropped (checked explicitly, never by
 * truthiness, so `false`/`0`/`''` survive), array values are appended once per element under
 * `` `${key}[]` ``, and everything is percent-encoded via `URLSearchParams` rather than raw string
 * concatenation (mitigation for threat T-01-02).
 */
export function buildQueryString(parameters: Record<string, unknown>): string {
  const searchParameters = new URLSearchParams();

  Object.entries(parameters).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((element) => {
        if (element === undefined || element === null) {
          return;
        }

        searchParameters.append(`${key}[]`, String(element));
      });

      return;
    }

    searchParameters.append(key, String(value));
  });

  return searchParameters.toString();
}

/**
 * Appends a query string to a url, returning `url` unchanged when `queryString` is empty and
 * otherwise joining with `?` or `&` depending on whether `url` already contains a query string.
 */
export function appendQueryString(url: string, queryString: string): string {
  if (!queryString) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
}

/**
 * Combines multiple abort signals into one. Uses the native `AbortSignal.any()` when the runtime
 * provides it, falling back to a manual multi-listener controller otherwise (D-02). The resolved
 * browserslist targets for this project (`> 2%, last 2 years, not ie_mob > 0, not ie > 0, not dead`)
 * bottom out at chrome 130, edge 129, firefox 131, safari/ios_saf 18.1, samsung 28 and opera 114 —
 * all well past `AbortSignal.any()` shipping — but detection is used instead of relying on that
 * union alone, so the fallback branch keeps this correct even if an older engine slips in.
 */
export function combineAbortSignals(signals: Array<AbortSignal | undefined>): AbortSignal | undefined {
  const definedSignals = signals.filter((signal): signal is AbortSignal => signal !== undefined);

  if (definedSignals.length === 0) {
    return undefined;
  }

  if (definedSignals.length === 1) {
    return definedSignals[0];
  }

  if (typeof AbortSignal.any === 'function') {
    return AbortSignal.any(definedSignals);
  }

  // Manual fallback for runtimes without `AbortSignal.any()`. Listeners are intentionally never
  // removed: every signal combined here is per-request and short-lived, so nothing is leaked
  // beyond the lifetime of a single request.
  const controller = new AbortController();

  definedSignals.some((signal) => {
    if (signal.aborted) {
      controller.abort(signal.reason);

      return true;
    }

    signal.addEventListener(
      'abort',
      () => {
        controller.abort(signal.reason);
      },
      { once: true },
    );

    return false;
  });

  return controller.signal;
}

/**
 * Returns a signal that aborts after `timeout` milliseconds, or `undefined` when `timeout` is `0`
 * or negative (no timeout). Prefers the native `AbortSignal.timeout()`; falls back to a manually
 * scheduled controller otherwise. Both paths abort with a `TimeoutError`-named reason so
 * `isSilentAbortError` recognises a timeout the same way regardless of which path ran.
 */
export function createTimeoutSignal(timeout: number): AbortSignal | undefined {
  if (timeout <= 0) {
    return undefined;
  }

  if (typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(timeout);
  }

  const controller = new AbortController();

  setTimeout(() => {
    controller.abort(new DOMException('The operation timed out.', 'TimeoutError'));
  }, timeout);

  return controller.signal;
}

/**
 * Returns `true` when a rejection is a caller-triggered abort or a timeout, both of which must stay
 * notification-free (REQ-04). Reads the `name` off the rejection value rather than using
 * `instanceof DOMException`, which is inconsistent enough across runtimes (browser vs jsdom) that a
 * name check is the robust form.
 * UNVERIFIED — that `AbortSignal.timeout()` aborts with a `TimeoutError`-named reason (not
 * `AbortError`) is platform/spec behaviour and cannot be confirmed from any local file, so per D-04
 * it is recorded as unverified rather than asserted. It is long-standing, non-controversial engine
 * behaviour, and the implementation is safe either way: checking both names is correct whichever
 * name the runtime actually uses. Confirm at runtime if desired by aborting a request via
 * `AbortSignal.timeout(1)` in the browser console and reading `err.name`.
 */
export function isSilentAbortError(error: unknown): boolean {
  const name = (error as { name?: string } | null)?.name;

  return name === 'AbortError' || name === 'TimeoutError';
}

/**
 * Issues an HTTP request via native `fetch`, reproducing the behaviours the previous client
 * provided implicitly: JSON body parsing into `data`, rejection on a non-2xx response carrying the
 * parsed body at `.response.data`, `params` → query-string serialization, and a combined
 * abort/timeout signal. Never imports from `@/setup/i18n` or `@/stores/*`, so the locale header
 * wiring in plan 01-02 cannot form a static import cycle through this module.
 */
export async function apiRequest(options: ApiRequestOptions, config?: ApiRequestConfig): Promise<ApiResult> {
  const finalUrl = appendQueryString(options.url, buildQueryString(config?.params ?? {}));

  const headers: Record<string, string> = {
    ...options.defaultHeaders,
    ...config?.headers,
  };

  if (!hasHeader(headers, 'accept')) {
    headers.Accept = DEFAULT_ACCEPT_HEADER;
  }

  // eslint-disable-next-line no-undef -- `BodyInit` is a type-only DOM lib global, not a runtime value, so it is unknown to eslint's `no-undef`.
  let body: BodyInit | undefined;

  if (options.data !== undefined) {
    if (isRawBody(options.data)) {
      body = options.data;
    } else {
      body = JSON.stringify(options.data);

      if (!hasHeader(headers, 'content-type')) {
        headers['Content-Type'] = 'application/json';
      }
    }
  }

  const signal = combineAbortSignals([config?.signal, createTimeoutSignal(config?.timeout ?? API_DEFAULT_TIMEOUT)]);

  // `credentials` is left at the platform default (sends cookies for same-origin requests, same as
  // the previous client's browser transport) unless the caller opts into a different value.
  const response = await fetch(finalUrl, {
    method: options.method,
    headers,
    body,
    signal,
    credentials: config?.credentials,
    mode: config?.mode,
    cache: config?.cache,
    redirect: config?.redirect,
    referrerPolicy: config?.referrerPolicy,
  });

  const text = await response.text();
  let data: unknown = text;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  const result: ApiResult = {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
  };

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, {
      status: response.status,
      response: result,
    });
  }

  return result;
}
