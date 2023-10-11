/**
 * Process an array in chunks, calling the specified callback for each chunk.
 *
 * @param array - The array to process.
 * @param chunkSize - The size of each chunk.
 * @param callback - The callback function to call for each chunk.
 * @param continueOnFailure - Whether to continue processing the array if the callback throws an error.
 *
 * @throws {Error} If the input parameters are invalid.
 * @throws {Error} If the callback throws an error and continueOnFailure is false.
 *
 * @returns {Promise<void>}
 */
export default function processArrayInChunks<T>( // eslint-disable-line max-params
  array: T[],
  chunkSize: number,
  callback: (chunk: T[]) => Promise<void>,
  continueOnFailure = true
): Promise<void> {
  if (!Array.isArray(array) || typeof callback !== 'function' || chunkSize <= 0) {
    throw new Error('Invalid input parameters');
  }

  /**
   * This function processes a chunk of the array and returns a Promise that resolves when the chunk has been processed.
   *
   * @param index - The index of the chunk to process.
   *
   * @returns {Promise<void>}
   */
  const processChunk = (index: number): Promise<void> => {
    if (index >= array.length) {
      return Promise.resolve();
    }

    const chunk = array.slice(index, index + chunkSize);

    return new Promise<void>((resolve, reject) => {
      const result = callback(chunk);

      if (result instanceof Promise) {
        result
          .then(() => resolve())
          .catch((error) => {
            if (!continueOnFailure) {
              reject(error);
            } else {
              resolve();
            }
          });
      } else {
        resolve();
      }
    }).then(() => processChunk(index + chunkSize));
  };

  return processChunk(0);
}
