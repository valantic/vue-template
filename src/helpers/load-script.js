/**
 * @type [Array.<String>} Holds a list of scripts that are still loading.
 */
let loadingQueue = [];

/**
 * @type {Array.<Object>} Holds a list of callbacks for a given src in case
 * loadScript was called multiple times before the source loaded.
 */
let callbacks = [];

/**
 * This helper will load the given script source unless it is already present in the DOM.
 * The callback is called after the script has been loaded.
 *
 * @param {String} scriptSrc - The source of the script to load.
 * @param {Function} [callback] - Optional callback method which will be called after the script has been loaded.
 * @param {Object} [attributes] attributes - Allows to set additional attributes for the script tag.
 * @param {Boolean} [attributes.defer] - Allows to add `defer` on the script tag.
 * @param {Boolean} [attributes.async] - Allows to add `async` on the script tag.
 */
export default function loadScript(scriptSrc, callback, attributes) { // eslint-disable-line max-params
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
