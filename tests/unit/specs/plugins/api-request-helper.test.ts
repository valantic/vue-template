/* eslint-disable id-length */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FetchError, createFetchInstance, isAbortError } from '@/stores/plugins/api-request-helper';

describe('api-request-helper', () => {
  const mockFetch = vi.fn();

  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('createFetchInstance', () => {
    it('should create a fetch instance with default methods', () => {
      const instance = createFetchInstance();

      expect(instance).toHaveProperty('get');
      expect(instance).toHaveProperty('post');
      expect(instance).toHaveProperty('patch');
      expect(instance).toHaveProperty('put');
      expect(instance).toHaveProperty('delete');
      expect(instance).toHaveProperty('defaults');
    });

    it('should perform a basic GET request', async () => {
      const instance = createFetchInstance();
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ foo: 'bar' }),
      };

      mockFetch.mockResolvedValue(mockResponse);

      const response = await instance.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(response.data).toEqual({ foo: 'bar' });
      expect(response.status).toBe(200);
    });

    it('should handle URL parameters correctly', async () => {
      const instance = createFetchInstance();

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
      });

      await instance.get('/test', { params: { a: 1, b: 'two', c: null, d: undefined } });

      expect(mockFetch).toHaveBeenCalledWith('/test?a=1&b=two', expect.any(Object));

      await instance.get('/test?existing=true', { params: { a: 1 } });

      expect(mockFetch).toHaveBeenCalledWith('/test?existing=true&a=1', expect.any(Object));
    });

    it('should merge headers correctly', async () => {
      const instance = createFetchInstance();

      instance.defaults.headers.common['X-Common'] = 'common';

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
      });

      await instance.get('/test', { headers: { 'X-Custom': 'custom' } });

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          headers: {
            'X-Common': 'common',
            'X-Custom': 'custom',
          },
        }),
      );
    });

    it('should set Content-Type to application/json if data is provided', async () => {
      const instance = createFetchInstance();

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
      });

      await instance.post('/test', { foo: 'bar' });

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ foo: 'bar' }),
        }),
      );
    });

    it('should handle different response types', async () => {
      const instance = createFetchInstance();

      // Text
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        text: () => Promise.resolve('plain text'),
      });

      const textResponse = await instance.get('/test', { responseType: 'text' });

      expect(textResponse.data).toBe('plain text');

      // Blob
      const blob = new Blob(['blob content']);

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        blob: () => Promise.resolve(blob),
      });

      const blobResponse = await instance.get('/test', { responseType: 'blob' });

      expect(blobResponse.data).toBe(blob);

      // ArrayBuffer
      const buffer = new ArrayBuffer(8);

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        arrayBuffer: () => Promise.resolve(buffer),
      });

      const bufferResponse = await instance.get('/test', { responseType: 'arraybuffer' });

      expect(bufferResponse.data).toBe(buffer);
    });

    it('should throw FetchError for non-ok responses', async () => {
      const instance = createFetchInstance();
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ error: 'not found' }),
      };

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await instance.get('/error');
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);

        const fetchError = error as FetchError;

        expect(fetchError.message).toBe('Request failed with status 404');
        expect(fetchError.response?.status).toBe(404);
        expect(fetchError.response?.data).toEqual({ error: 'not found' });
      }
    });

    it('should handle abort errors', async () => {
      const instance = createFetchInstance();
      const controller = new AbortController();

      const abortError = new DOMException('Aborted', 'AbortError');

      mockFetch.mockRejectedValue(abortError);

      try {
        await instance.get('/test', { signal: controller.signal });
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
        expect((error as FetchError).code).toBe('ABORT');
        expect(isAbortError(error)).toBe(true);
      }
    });

    it('should handle auto-parsing based on content-type', async () => {
      const instance = createFetchInstance();

      // JSON content type
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ foo: 'bar' }),
      });

      const jsonResponse = await instance.get('/test');

      expect(jsonResponse.data).toEqual({ foo: 'bar' });

      // Non-JSON but valid JSON string
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: () => Promise.resolve('{"a":1}'),
      });

      const textJsonResponse = await instance.get('/test');

      expect(textJsonResponse.data).toEqual({ a: 1 });

      // Non-JSON plain text
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: () => Promise.resolve('just text'),
      });

      const textResponse = await instance.get('/test');

      expect(textResponse.data).toBe('just text');
    });
  });

  describe('isAbortError', () => {
    it('should identify different types of abort errors', () => {
      expect(isAbortError(new DOMException('Aborted', 'AbortError'))).toBe(true);

      const error = new Error('Aborted');

      error.name = 'AbortError';

      expect(isAbortError(error)).toBe(true);
      expect(isAbortError(new FetchError('Aborted', undefined, 'ABORT'))).toBe(true);
      expect(isAbortError(new Error('Other'))).toBe(false);
    });
  });
});
