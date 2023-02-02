/**
 * Holds a list of scripts that are still loading.
 */
let loadingQueue: string[] = [];

interface ICallback {
  id: string;
  callback: () => unknown;
}

/**
 * Holds a list of callbacks for a given src in case
 * loadScript was called multiple times before the source loaded.
 */
let callbacks: ICallback[] = [];

interface IAttributes {
  defer: boolean;
  async: boolean;
}

/**
 * This helper will load the given script source unless it is already present in the DOM.
 * The callback is called after the script has been loaded.
 */
export default function loadScript(scriptSrc: string, callback?: () => unknown, attributes?: IAttributes): void {
  const existingTag = document.querySelector(`script[src="${scriptSrc}"]`);
  const {
    defer = true,
    async = true,
  } = attributes || {};

  if (!existingTag) {
    const script = document.createElement('script');

    loadingQueue.push(scriptSrc);

    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.defer = defer;
    script.async = async;

    if (typeof callback === 'function') {
      script.onload = () => {
        callback();

        callbacks = callbacks.filter((queueItem) => {
          const isCurrentScript = queueItem.id === scriptSrc;

          if (isCurrentScript) {
            queueItem.callback();
          }

          return isCurrentScript;
        });

        loadingQueue = loadingQueue.filter(loadingScript => loadingScript !== scriptSrc);
      };
    }

    document.head.appendChild(script);
  } else if (typeof callback === 'function') {
    if (loadingQueue.includes(scriptSrc)) {
      callbacks.push({
        id: scriptSrc,
        callback,
      });
    } else {
      callback();
    }
  }
}
