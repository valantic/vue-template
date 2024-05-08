import { describe, expect, it, vi } from 'vitest';
import processArrayInChunks from '@/helpers/process-array-in-chunks';

describe('proccess-array-in-chunks', () => {
  it('throws an error if the input parameters are invalid', () => {
    expect(() => processArrayInChunks<number>([], -5, () => Promise.resolve())).toThrow();
    expect(() => processArrayInChunks<number>([], 0, () => Promise.resolve())).toThrow();
  });

  it('processes an array in chunks', async () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 2;
    const callback = vi.fn();

    await processArrayInChunks<number>(array, chunkSize, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith([1, 2]);
    expect(callback).toHaveBeenCalledWith([3, 4]);
    expect(callback).toHaveBeenCalledWith([5]);
  });

  it('continues processing the array if the callback throws an error', async () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 2;
    const callback = vi.fn(async (chunk: number[]) => {
      if (chunk[0] === 3) {
        throw new Error('Test error');
      }
    });

    await processArrayInChunks<number>(array, chunkSize, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith([1, 2]);
    expect(callback).toHaveBeenCalledWith([3, 4]);
    expect(callback).toHaveBeenCalledWith([5]);
  });

  it('stops processing the array if the callback throws an error and continueOnFailure is false', async () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 2;
    const callback = vi.fn(async (chunk: number[]) => {
      if (chunk[0] === 3) {
        throw new Error('Test error');
      }
    });

    await expect(processArrayInChunks<number>(array, chunkSize, callback, false)).rejects.toThrow('Test error');

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith([1, 2]);
    expect(callback).toHaveBeenCalledWith([3, 4]);
  });

  it('processes an array in chunks without async callback', async () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 2;
    const callback = vi.fn();

    await processArrayInChunks<number>(array, chunkSize, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith([1, 2]);
    expect(callback).toHaveBeenCalledWith([3, 4]);
    expect(callback).toHaveBeenCalledWith([5]);
  });

  it('processes an array in chunks without async callback and without continueOnFailure', async () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 2;
    const callback = vi.fn((chunk: number[]) => {
      if (chunk[0] === 3) {
        throw new Error('Test error');
      }
    });

    await expect(processArrayInChunks<number>(array, chunkSize, callback, false)).rejects.toThrow('Test error');

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith([1, 2]);
    expect(callback).toHaveBeenCalledWith([3, 4]);
  });

  it('processes an empty array', async () => {
    const array: number[] = [];
    const chunkSize = 2;
    const callback = vi.fn();

    await processArrayInChunks<number>(array, chunkSize, callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
