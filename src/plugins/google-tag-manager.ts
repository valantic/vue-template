import { Plugin } from 'vue';

enum GaListNames {
  CATALOG = 'Catalog',
  SEARCH_RESULTS = 'Search results',
  // .. Add additional lists
}

type Options = {
  debug?: boolean;
};

type ListItem = {
  item_id: string;
  item_name: string;
  currency?: string | null;
  index?: number | null;
  price?: number | null;
  quantity?: number | null;
  item_category?: string | null;
  item_list_name?: string;
};

type PurchasePayload = {
  currency: string;
  value: number;
  shipping: number | null;
  tax: number | null;
  items: ListItem[];
};

type AddPaymentInfoPayload = {
  currency: string;
  value: number;
  paymentType: string;
  items: ListItem[];
};

type AddShippingInfoPayload = {
  currency: string;
  value: number;
  shippingTier: string;
  items: ListItem[];
};

export type Gtm = {
  push(payload: Record<string, unknown>): void;
  pushAddToCart(item: ListItem, list: GaListNames): void;
  pushLogin(): void;
  pushSignUp(): void;
  pushSearch(searchTerm: string): void;
  pushViewItemList(items: ListItem[], list: GaListNames): void;
  pushViewItem(item: ListItem): void;
  pushViewCart(items: ListItem[], value: number, currency: string): void;
  pushRemoveFromCart(items: ListItem): void;
  pushAddToWishlist(item: ListItem): void;
  pushBeginCheckout(items: ListItem[], value: number, currency: string): void;
  pushSelectItem(item: ListItem, list: GaListNames): void;
  pushPurchase(payload: PurchasePayload): void;
  pushAddPaymentInfo(payload: AddPaymentInfoPayload): void;
  pushAddShippingInfo(payload: AddShippingInfoPayload): void;
  debug(enable: boolean): void;
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Adds a Google Tag Manager interface to the app.
 */
const plugin: Plugin = {
  /**
   * Install method of the Google Tag Manager plugin.
   */
  install(app, options: Options = {}) {
    let { debug } = options;

    /**
     * Push a new event to the dataLayer.
     */
    function push(payload: Record<string, unknown>): void {
      if (window.dataLayer && window.dataLayer.push) {
        window.dataLayer.push(payload);

        // Log if debug and development mode are active
        if (import.meta.env.MODE !== 'production') {
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

    const api: Gtm = {
      push,

      /**
       * Pushes `purchase`-event to the dataLayer.
       */
      pushPurchase(payload: PurchasePayload) {
        push({
          event: 'purchase',
          ecommerce: {
            ...payload,
          },
        });
      },

      /**
       * Pushes `add_payment_info`-event to the dataLayer.
       */
      pushAddPaymentInfo(payload: AddPaymentInfoPayload) {
        push({
          event: 'add_payment_info',
          ecommerce: {
            ...payload,
          },
        });
      },

      /**
       * Pushes `add_shipping_info`-event to the dataLayer.
       */
      pushAddShippingInfo(payload: AddShippingInfoPayload) {
        push({
          event: 'add_shipping_info',
          ecommerce: {
            ...payload,
          },
        });
      },

      /**
       * Pushes `add_to_wishlist`-event to the dataLayer.
       */
      pushAddToWishlist(item: ListItem) {
        push({
          event: 'add_to_wishlist',
          ecommerce: {
            items: [item],
            value: item.price,
            currency: item.currency,
          },
        });
      },

      /**
       * Pushes `remove_from_cart`-event to the dataLayer.
       */
      pushRemoveFromCart(item: ListItem) {
        push({
          event: 'remove_from_cart',
          ecommerce: {
            items: [item],
            value: item.price,
            currency: item.currency,
          },
        });
      },

      /**
       * Pushes `view_cart`-event to the dataLayer.
       */
      pushViewCart(items: ListItem[], value: number, currency: string) {
        push({
          event: 'view_cart',
          ecommerce: {
            items: items.map((item, index) => ({
              ...item,
              index: index + 1,
            })),
            value,
            currency,
          },
        });
      },

      /**
       * Pushes `begin_checkout`-event to the dataLayer.
       */
      pushBeginCheckout(items: ListItem[], value: number, currency: string) {
        push({
          event: 'begin_checkout',
          ecommerce: {
            items: items.map((item, index) => ({
              ...item,
              index: index + 1,
            })),
            value,
            currency,
          },
        });
      },

      /**
       * Pushes `view_item`-event to the dataLayer.
       */
      pushViewItem(item: ListItem) {
        push({
          event: 'view_item',
          ecommerce: {
            items: [item],
            value: item.price,
            currency: item.currency,
          },
        });
      },

      /**
       * Pushes `view_item_list`-event to the dataLayer.
       */
      pushViewItemList(items: ListItem[], list: GaListNames) {
        push({
          event: 'view_item_list',
          ecommerce: {
            item_list_name: list,
            items: items.map((item, index) => ({
              ...item,
              list,
              index: index + 1,
            })),
          },
        });
      },

      /**
       * Pushes `select_item`-event to the dataLayer.
       */
      pushSelectItem(item: ListItem, list: GaListNames) {
        push({
          event: 'select_item',
          ecommerce: {
            item_list_name: list,
            items: [item],
          },
        });
      },

      /**
       * Pushes `login`-event to the dataLayer.
       */
      pushLogin() {
        push({
          event: 'login',
        });
      },

      /**
       * Pushes `sign_up`-event to the dataLayer.
       */
      pushSignUp() {
        push({
          event: 'sign_up',
        });
      },

      /**
       * Pushes `search`-event to the dataLayer.
       */
      pushSearch(searchTerm: string) {
        push({
          event: 'search',
          ecommerce: {
            searchTerm,
          },
        });
      },

      /**
       * Pushes `add_to_cart`-event to the dataLayer.
       */
      pushAddToCart(item: ListItem, list: GaListNames) {
        push({
          event: 'add_to_cart',
          ecommerce: {
            currency: item.currency,
            items: [
              {
                ...item,
                item_list_name: list,
              },
            ],
          },
        });
      },

      /**
       * Enable/disable debugging.
       */
      debug(enable: boolean) {
        debug = enable !== false;
      },
    };

    app.config.globalProperties.$gtm = api;
  },
};

export default plugin;
