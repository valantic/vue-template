import { ComponentPublicInstance, Plugin } from 'vue';

interface IOptions {
  debug?: boolean;
  dataLayer?: string;
}

interface IProductData {
  name: string;
  sku: string;
  eNumber: string;
  measurementUnitName: string;
}

interface IProductImpression {
  id: string;
  name: string;
  dimension1: string;
  list: string | null;
  position: number;
}

export interface IGtm {
  push: (payload: object) => void;
  pushProductImpressions: (products: IProductData[], eventPath: string, startIndex: number) => void;
  pushVirtualPage: () => void;
  pushProductClick: ({ name, sku, eNumber }: IProductData, position: number, eventPath: string) => void;
  pushAddToCart: (product: IProductData, quantity: number, eventPath: string) => void;
  getEventPath: (component: ComponentPublicInstance, append: string) => string;
  debug: (enable: boolean) => void;
}

type MapProductCallbackFunction = (productData: IProductData, index: number) => IProductImpression;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { dataLayer: Record<string, any>[]; }
}

/**
 * Adds a Google Tag Manager interface to the app.
 */
const plugin: Plugin = {
  /**
   * Install method of the Google Tag Manager plugin.
   */
  install(app, options: IOptions = {}) {
    let { debug } = options;

    /**
     * Closure for product mapper method.
     */
    function mapProduct(eventPath: string, startIndex: number = 1): MapProductCallbackFunction {
      /**
       * Mapper function to convert product data to Google Tag Manager impression data.
       *
       * @see https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
       */
      return ({ name, sku, eNumber }: IProductData, index) => ({
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
     */
    function push(payload: object) {
      if (window.dataLayer && window.dataLayer.push) {
        window.dataLayer.push(payload);

        // Log if debug and development mode are active
        if (process.env.NODE_ENV !== 'production') {
          if (debug) {
            console.group('GTM debug'); // eslint-disable-line no-console
            console.log('payload', payload); // eslint-disable-line no-console
            console.log('dataLayer', window.dataLayer); // eslint-disable-line no-console
            console.groupEnd(); // eslint-disable-line no-console
          }
        }
      } else {
        throw new Error('Google Tag Manager dataLayer is not available!');
      }
    }

    app.config.globalProperties.$gtm = {
      push,

      /**
       * Pushes an Array of lists as Product Impressions to the dataLayer.
       */
      pushProductImpressions(products: IProductData[], eventPath: string, startIndex: number) {
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
       */
      pushProductClick({ name, sku, eNumber }: IProductData, position: number, eventPath: string) {
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
       */
      pushAddToCart(product: IProductData, quantity: number, eventPath: string) {
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
       */
      getEventPath(component: ComponentPublicInstance, append: string): string {
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
       */
      debug(enable: boolean) {
        debug = enable !== false;
      }
    };
  }
};

export default plugin;
