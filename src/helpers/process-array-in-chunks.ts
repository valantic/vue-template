/**
 * Process an array in chunks, calling the specified callback for each chunk.
 */
export default function processArrayInChunks<T>( // eslint-disable-line max-params
  itemsToProcess: T[],
  chunkSize: number,
  callback: (chunk: T[]) => Promise<void> | void,
  continueOnFailure = true
): Promise<void> {
  if (chunkSize <= 0) {
    throw new Error('Invalid chunk size input. The chunk size has to be greater than 0.');
  }

  /**
   * This function processes a chunk of the array and returns a Promise that resolves when the chunk has been processed.
   */
  const processChunk = (chunkStartIndex: number): Promise<void> => {
    if (chunkStartIndex >= itemsToProcess.length) {
      return Promise.resolve();
    }

    const chunk = itemsToProcess.slice(chunkStartIndex, chunkStartIndex + chunkSize);

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
    }).then(() => processChunk(chunkStartIndex + chunkSize));
  };

  return processChunk(0);
}
