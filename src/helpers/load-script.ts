interface ICallback {
  id: string;
  callback: () => unknown;
}

interface IAttributes {
  defer: boolean;
  async: boolean;
}

let scriptLoadingQueue: string[] = [];
let loadScriptCallbacks: ICallback[] = [];

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

    scriptLoadingQueue.push(scriptSrc);

    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.defer = defer;
    script.async = async;

    if (typeof callback === 'function') {
      script.onload = (): void => {
        callback();

        loadScriptCallbacks = loadScriptCallbacks.filter((queueItem) => {
          const isCurrentScript = queueItem.id === scriptSrc;

          if (isCurrentScript) {
            queueItem.callback();
          }

          return isCurrentScript;
        });

        scriptLoadingQueue = scriptLoadingQueue.filter(loadingScript => loadingScript !== scriptSrc);
      };
    }

    document.head.appendChild(script);
  } else if (typeof callback === 'function') {
    if (scriptLoadingQueue.includes(scriptSrc)) {
      loadScriptCallbacks.push({
        id: scriptSrc,
        callback,
      });
    } else {
      callback();
    }
  }
}
