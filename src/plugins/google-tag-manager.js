/**
 * Adds a Google Tag Manager interface to the app.
 */
export default {
  /**
   * Install method of the Google Tag Manager plugin.
   *
   * @param {Object} Vue - The Vue instance
   * @param {Object} [options] - Additional plugin options
   * @param {Boolean} [options.debug = false] - Allows to en-/disable debugging functionality.
   * @param {String} [options.dataLayer = 'dataLayer'] - Allows to define a custom dataLayer name.
   */
  install(Vue, options = {}) {
    const {
      dataLayer = 'dataLayer',
    } = options;
    let { debug } = options;

    /**
     * Closure for product mapper method.
     *
     * @param {String} [eventPath] - Component path which caused this update (e.g. 'category.replacement').
     * @param {Number} [startIndex = 1] - The index from which the "position" of the products should be calculated.
     *
     *  @returns {Function}
     */
    function mapProduct(eventPath, startIndex = 1) {
      /**
       * Mapper function to convert product data to Google Tag Manager impression data.
       *
       * @see https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
       *
       * @param {Object} product - The to be mapped product data.
       * @param {String} product.name - The products readable name.
       * @param {String} product.sku - The products SKU.
       * @param {Number} index - Index of the current loop.
       *
       * @returns {Object}
       */
      return ({ name, sku, eNumber }, index) => ({
        id: eNumber,
        name,
        dimension1: sku,
        list: eventPath || null,
        position: index + startIndex,
        // brand: null,
        // category: null, // Is defined on dataLayer initialization.
        // variant: null,
      });
    }

    /**
     * Push a new event to the dataLayer.
     *
     * @param {Object} payload - The new event data, which will be added to the dataLayer.
     */
    function push(payload) {
      if (window[dataLayer] && window[dataLayer].push) {
        window[dataLayer].push(payload);

        // Log if debug and development mode are active
        if (process.env.NODE_ENV !== 'production') {
          if (debug) {
            console.group('GTM debug'); // eslint-disable-line no-console
            console.log('payload', payload); // eslint-disable-line no-console
            console.log('dataLayer', window[dataLayer]); // eslint-disable-line no-console
            console.groupEnd(); // eslint-disable-line no-console
          }
        }
      } else {
        throw new Error('Google Tag Manager dataLayer is not available!');
      }
    }

    Vue.prototype.$gtm = {
      push,

      /**
       * Pushes an Array of lists as Product Impressions to the dataLayer.
       *
       * @see https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
       *
       * @param {Array.<Object>} products - An Array of product data objects.
       * @param {String} [eventPath] - The path which lead to the Google Tag Manager event.
       * @param {Number} [startIndex] - The index from which the "position" of the products should be calculated.
       */
      pushProductImpressions(products, eventPath, startIndex) {
        const impressions = products.map(mapProduct(eventPath, startIndex));

        push({
          event: 'productImpression',
          ecommerce: {
            currencyCode: 'CHF',
            impressions
          }
        });
      },

      /**
       * Pushes the current url and page title as a virtual page to the dataLayer.
       */
      pushVirtualPage() {
        push({
          event: 'VirtualPageview',
          virtualPageURL: window.location.href,
          virtualPageTitle: `Virtual page for "${window.document.title}"`
        });
      },

      /**
       * Pushes a clicked product item to the Google Tag Manager dataLayer.
       *
       * @param {Object} product - Data of a single product.
       * @param {String} product.name - The name of the product.
       * @param {String} product.sku - The sku of the product.
       * @param {String} product.eNumber - The eNumber of the product.
       * @param {Number} position - The position of the product in a list.
       * @param {String} eventPath - The path of the event (component path).
       */
      pushProductClick({ name, sku, eNumber }, position, eventPath) {
        push({
          event: 'productClick',
          ecommerce: {
            click: {
              actionField: {
                list: eventPath
              },
              products: [
                {
                  id: eNumber,
                  name,
                  dimension1: sku,
                  list: eventPath || null,
                  position,
                }
              ]
            }
          },
        });
      },

      /**
       * Pushes an add to cart notification to the Google Tag Manager dataLayer.
       *
       * @param {Object} product - Data of a single product.
       * @param {String} product.name - The name of the product.
       * @param {String} product.sku - The sku of the product.
       * @param {String} product.eNumber - The eNumber of the product.
       * @param {String} product.measurementUnitName - Measurement unit of added product.
       * @param {Number} quantity - The quantity that was added to the cart for this product.
       * @param {String} eventPath - The path of the event (component path).
       */
      pushAddToCart(product, quantity, eventPath) {
        const {
          name,
          sku,
          eNumber,
          measurementUnitName
        } = product;

        push({
          event: 'addToCart',
          ecommerce: {
            currencyCode: 'CHF',
            add: {
              products: [
                {
                  id: eNumber,
                  name,
                  dimension1: sku,
                  dimension2: measurementUnitName || null,
                  list: eventPath || null,
                  quantity
                }
              ]
            }
          }
        });
      },

      /**
       * Gets the event path by traveling up the Vue component tree and collecting gtmIdentifier props.
       * If defined, the gtmIdentifier of the root component will also be used.
       *
       * @param {Object} component - The root component from which the path will be evaluated.
       * @param {String} [append] - An additional entry which will be added to the end of the path.
       *
       * @returns {String}
       */
      getEventPath(component, append) {
        const path = [];
        let parent = component.$parent;

        if (component.gtmIdentifier) {
          path.push(component.gtmIdentifier);
        }

        while (parent) {
          const identifier = parent.gtmIdentifier;

          if (identifier) {
            path.push(identifier);
          }

          parent = parent.$parent;
        }

        if (append) {
          path.unshift(append);
        }

        return path.reverse().join('.');
      },

      /**
       * Enable/disable debugging.
       *
       * @param {Boolean} [enable = true] Flag if debugging should be en- or disabled.
       */
      debug(enable) {
        debug = enable !== false;
      }
    };
  }
};
