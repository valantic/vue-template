import { VUEX_COMMIT_ROOT_CONFIG } from '@/setup/globals';
import { i18n } from '@/setup/i18n';
import api from './../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object} Stores cart object
     */
    cart: process.env.NODE_ENV !== 'production'
      ? require('./mock/cart').default // eslint-disable-line global-require
      : {},

    /**
     * @type {Array} Stores a list of changed cart entries (quantity changes).
     */
    changedCartEntries: [],

    /**
     * @type {Object} Stores mini cart object.
     */
    miniCart: process.env.NODE_ENV !== 'production'
      ? require('./mock/miniCart').default // eslint-disable-line global-require
      : {},

    /**
     * @type {Object} Stores the meta cart information.
     */
    metaData: process.env.NODE_ENV !== 'production'
      ? require('./mock/cartMetaData').default // eslint-disable-line global-require
      : null,

    /**
     * @type {String|Number} Stores the temporary selected shipping method.
     */
    temporarySelectedShippingMethod: null,

    /**
     * @type {Boolean} Flag says if there is currently any cart request running.
     */
    requestIsRunning: false,

    /**
     * @type {String|Number} Stores the temporary selected pickup location to not change the initial data.
     */
    temporarySelectedPickupLocation: null,

    /**
     * @type {Boolean} The flag if the quick-add-to-cart progress is running.
     */
    quickAddToCartIsLoading: false,

    /**
     * @type {Object} Stores all the temporary checkout data objects.
     */
    temporaryCheckoutData: {},
  },
  getters: {
    /**
     * Gets the items in the cart.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array} items - Items in cart
     */
    items: state => (state.cart && Array.isArray(state.cart.items) && state.cart.items) || [], // 'items' is sometimes object when empty

    /**
     * Gets number of items in cart from cart itself or miniCart if available.
     *
     * @param {Object} state - Current state object.
     * @param {Object} getters - The module related getters.
     *
     * @returns {Number} quantity - Number of items in cart
     */
    quantity: (state, getters) => (state.cart && state.cart.items
      ? getters.items.length
      : (state.miniCart && state.miniCart.cartQuantity) || 0),

    /**
     * Gets subtotal price for all cart items.
     *
     * Since the value can sometimes be a string 0 ("0") we use parseInt to get an evaluable number.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number} subtotal - Subtotal of items in cart
     */
    subTotal: state => parseInt(state.cart && state.cart.items ? state.cart.totals.subtotal : state.miniCart.netTotal, 10),

    /**
     * Gets the total price object.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object|null}
     */
    totals: state => (state.cart && state.cart.totals) || null,

    /**
     * Gets the list of changed cart entries.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    hasChangedEntries: state => Array.isArray(state.changedCartEntries) && state.changedCartEntries.length > 0,

    /**
     * Gets the list of contracts.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    contracts(state) {
      const contracts = state.metaData && state.metaData.contracts;

      return Array.isArray(contracts) ? contracts : [];
    },

    /**
     * Gets the id of the selected object.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number}
     */
    selectedContractId: state => state.cart && state.cart.contractId,

    /**
     * Gets all shipment methods.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    shipmentMethods(state) {
      const methods = state.metaData && state.metaData.shipmentMethods;

      if (!Array.isArray(methods)) {
        return [];
      }

      return methods.map(item => ({
        value: item.key,
        label: item.name,
      }));
    },

    /**
     * Gets the currently selected shipping method.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    selectedShipmentMethod: state => state.temporarySelectedShippingMethod || (
      state.cart && state.cart.selectedShipmentMethodId
        ? state.cart.selectedShipmentMethodId
        : ''
    ),

    /**
     * Gets the list of available addresses.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    addresses: state => state.metaData && state.metaData.addresses,

    /**
     * Gets the active address to show on the cart page.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object|null}
     */
    activeShippingAddress: state => state.cart && state.cart.shippingAddress,

    /**
     * Gets the active address id.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number|null}
     */
    activeShippingAddressId: state => state.cart && state.cart.addressId,

    /**
     * Gets the list of available pickup locations.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    pickupLocations: state => (state.metaData && state.metaData.pickupLocations) || [],

    /**
     * Gets the active pickup location to show on the cart page.
     *
     * @param {Object} state - Current state object.
     * @param {Object} getters - Getters from the current store object.
     *
     * @returns {Object}
     */
    activePickupLocation(state, getters) {
      const pickupLocationId = state.temporarySelectedPickupLocation || (state.cart && state.cart.pickupLocationErpId);
      const active = getters.pickupLocations.filter(location => location.id === pickupLocationId);

      return active[0] || null;
    },

    /**
     * Gets the temporary selected pickup location id.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String|Number}
     */
    temporarySelectedPickupLocation(state) {
      return state && state.temporarySelectedPickupLocation;
    },

    /**
     * Gets the state of the requests.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    requestIsRunning: state => state.requestIsRunning,

    /**
     * Gets the state of the quick add to cart progress.
     *
     * @param {Object} state - Current state
     *
     * @returns {Boolean}
     */
    quickAddToCartIsLoading: state => state.quickAddToCartIsLoading,

    /**
     * Check if split delivery is allowed.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    isPartDelivery: (state) => {
      if (state.temporaryCheckoutData && typeof state.temporaryCheckoutData.isPartDelivery === 'boolean') {
        return state.temporaryCheckoutData.isPartDelivery;
      }

      return !!state.cart && state.cart.isPartDelivery;
    },

    /**
     * Gets the selected delivery date.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    deliveryDate(state) {
      return state.temporaryCheckoutData && typeof state.temporaryCheckoutData.deliveryDate === 'string'
        ? state.temporaryCheckoutData.deliveryDate
        : (state.cart && state.cart.deliveryDate) || '';
    },

    /**
     * Gets the list of available confirmation options.
     *
     * @param {Object} state - Current state
     *
     * @returns {Array}
     */
    confirmationOptions: state => (
      state.metaData
      && Array.isArray(state.metaData.saleNotifications)
      && state.metaData.saleNotifications)
      || [],

    /**
     * Gets the currently active confirmation option.
     *
     * @param {Object} state - Current state
     *
     * @returns {String}
     */
    selectedConfirmationOption: state => (state.temporaryCheckoutData && state.temporaryCheckoutData.deliveryConfirmationMethod)
      || (state.cart && state.cart.salesNotificationType)
      || '',

    /**
     * Gets the contact name.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    contactName: state => (state.temporaryCheckoutData && state.temporaryCheckoutData.contactName)
      || (state.cart && state.cart.contactName)
      || '',

    /**
     * Gets the customerCommission.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    customerCommission: state => (state.temporaryCheckoutData && state.temporaryCheckoutData.customerCommission)
      || (state.cart && state.cart.customerCommission)
      || '',

    /**
     * Gets the text reference.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    textReference: state => (state.temporaryCheckoutData && state.temporaryCheckoutData.textReference)
      || (state.cart && state.cart.textReference)
      || '',

    /**
     * Gets the order text.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    orderText: state => (state.temporaryCheckoutData && state.temporaryCheckoutData.orderText)
      || (state.cart && state.cart.orderText)
      || '',

    /**
     * Gets the message to sales.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    messageToSales: state => (state.temporaryCheckoutData && state.temporaryCheckoutData.messageToSales)
      || (state.cart && state.cart.messageToSales)
      || '',

    /**
     * Gets the temporary checkout data.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    temporaryCheckoutData: state => state.temporaryCheckoutData,

    /**
     * Returns a boolean that determines if there is temporary, unsaved checkout data available.
     *
     * @param {Object} state - The current vuex module state.
     *
     * @returns {Boolean}
     */
    getHasTemporaryCheckoutData: state => !!(state.temporaryCheckoutData && Object.keys(state.temporaryCheckoutData).length),

    /**
     * TODO: This is not yet implemented in the backend, so the store property will most likely be changed.
     *
     * Gets the mandatory fields for the checkout page.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    mandatoryFields: state => state.cart.mandatoryFields,
  },
  mutations: {
    /**
     * Cart data provided by backend.
     *
     * @param {Object} state - Current state object.
     * @param {Object} data - Cart data object.
     */
    data(state, data) {
      if (typeof data !== 'object') {
        return;
      }

      state.cart = data;
    },

    /**
     * Mini cart data provided by backend.
     *
     * @param {Object} state - Current state object.
     * @param {Object} data - Cart data object.
     */
    dataMiniCart(state, data) {
      state.miniCart = data;
    },

    /**
     * Update cart totals object.
     *
     * @param {Object} state - Current state object.
     * @param {Object} totals - Totals data object.
     */
    updateTotals(state, totals) {
      if (state.cart && state.cart.items) {
        state.cart.totals = totals;
      } else {
        state.miniCart.netTotal = totals.subtotal;
      }
    },

    /**
     * Removes all items from cart.
     *
     * @param {Object} state - Current state object.
     */
    removeAllCartItems(state) {
      if (!state.cart || !state.cart.items) {
        return;
      }

      state.cart.items = [];
    },

    /**
     * Adds a temporary cart item to the changed entries list or removes it if the quantity is the same
     * like in the original list.
     *
     * @param {Object} state - The current state.
     * @param {Object} item - A temporary cart item with sku, groupKey and quantity.
     */
    updateCartEntry(state, item) {
      /**
       * Filter definition to find a specific cart entry.
       *
       * @param {Object} entry - The cart item.
       *
       * @returns {Boolean}
       */
      function findCartEntryByItem(entry) {
        return entry.sku === item.sku && entry.groupKey === item.groupKey;
      }

      const originalItem = state.cart.items.find(findCartEntryByItem);
      const changedEntries = state.changedCartEntries;
      const tempEntry = changedEntries.find(findCartEntryByItem);

      if (tempEntry) {
        tempEntry.quantity = item.quantity;
      } else if (originalItem && originalItem.quantity !== item.quantity) {
        // Add to temporary list.
        changedEntries.push(item);
      } else if (originalItem) {
        // Remove from temporary list
        state.changedCartEntries = changedEntries.filter(entry => entry.sku !== item.sku
          || entry.groupKey !== item.groupKey);
      }
    },

    /**
     * Resets the temporary changedCartEntries list.
     *
     * @param {Object} state - The current state.
     */
    resetTemporaryCart(state) {
      state.changedCartEntries = [];
    },

    /**
     * Resets the temporary checkout data.
     *
     * @param {Object} state - The current state.
     */
    resetTemporaryCheckout(state) {
      state.temporaryCheckoutData = {};
    },

    /**
     * Sets the meta data for the cart.
     *
     * @param {Object} state - The current state.
     * @param {Object} data - The meta data object from the backend.
     */
    metaData(state, data) {
      state.metaData = data;
    },

    /**
     * Sets a temporary shipping method id, because we need to store it temporary while the request is running.
     *
     * @param {Object} state - The current state.
     * @param {String} methodId - The shipping method id.
     */
    setTemporarySelectedShippingMethod(state, methodId) {
      state.temporarySelectedShippingMethod = methodId;
    },

    /**
     * Sets the flag of the request state.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isRunning - State of the request.
     */
    setRequestIsRunningState(state, isRunning) {
      state.requestIsRunning = isRunning;
    },

    /**
     * Sets a temporary pickup location id, because we need to store it temporary while the request is running.
     *
     * @param {Object} state - The current state.
     * @param {String|Number} pickupId - The pickup location id.
     */
    setTemporarySelectedPickupLocation(state, pickupId) {
      state.temporarySelectedPickupLocation = pickupId;
    },

    /**
     * Sets the progress state of the quick-add-to-cart.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isRunning - The running state.
     */
    setQuickAddToCartProgress(state, isRunning) {
      state.quickAddToCartIsLoading = isRunning;
    },

    /**
     * Sets the flag for split delivery allowed.
     *
     * @param {Object} state - The current state.
     * @param {Boolean} isPartDelivery - The value to set.
     */
    updateIsPartDelivery(state, isPartDelivery) {
      state.cart = { ...state.cart, isPartDelivery };
    },

    /**
     * Sets the selected delivery date.
     *
     * @param {Object} state - The current state.
     * @param {String} deliveryDate - The selected date formatted in YYYY-MM-DD.
     */
    updatedDeliveryDate(state, deliveryDate) {
      state.cart = { ...state.cart, deliveryDate };
    },

    /**
     * Sets the temporary checkout data.
     *
     * @param {Object} state - Current state object.
     * @param {Object} payload - The given payload object to be set.
     */
    setTemporaryCheckoutData(state, payload) {
      state.temporaryCheckoutData = {
        ...state.temporaryCheckoutData,
        ...payload,
      };
    },
  },
  actions: {
    /**
     * Asynchronously add product to cart.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit object.
     * @param {Function} context.rootGetters - The root getters object for access to other store module getters.
     * @param {Function} context.dispatch - Vuex method to dispatch an action call.
     * @param {Object} payload - The request payload.
     * @param {String} payload.quantity - Amount of product units to be added.
     * @param {String} payload.sku - Sku of the product to be added.
     *
     * @returns {Promise} Promise object
     */
    addToCart({ commit, rootGetters, dispatch }, { sku, quantity }) {
      if (!sku) {
        dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

        return Promise.reject(new Error('No sku provided'));
      }

      if (!rootGetters['session/isLoggedInUser']) {
        const notification = {
          message: {
            type: 'error',
            message: i18n.t('c-add-to-cart.notLoggedInMessage'),
          },
          expire: true,
          title: i18n.t('c-add-to-cart.notLoggedInTitle'),
        };

        commit('notification/pushNotification', notification, { root: true });
        commit('session/setLoginWindowIsOpen', true, { root: true });

        return Promise.resolve(null);
      }

      const data = {
        sku,
        quantity: quantity > 0 ? quantity : 1,
      };

      return api.post('/cart/1', data) // TODO: Replace id of cart.
        .then((response) => {
          const responseData = response.data && response.data.data;

          if (responseData && responseData.totals && Object.keys(responseData.totals).length) {
            commit('updateTotals', responseData.totals);
            commit('data', responseData);

            return response;
          }

          return Promise.reject(new Error('Invalid cart data returned'));
      });
    },

    /**
     * Sends delete request to remove all items from cart.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     *
     * @returns {Promise}
     */
    removeAllItems({ commit }) {
      commit('setRequestIsRunningState', true);

      return api.delete(`${i18n.t('urls.cart')}/1`) // TODO: Replace id of cart.
        .then((response) => {
          const responseDate = response.data && response.data.data;

          commit('removeAllCartItems');

          if (responseDate) {
            commit('data', responseDate);
          }

          return response;
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Sends a single item delete request and updates the full cart.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} context.dispatch - The dispatch context method.
     * @param {Object} payload - The payload data.
     * @param {String} payload.sku - The sku of the product you want to remove.
     * @param {String} payload.groupKey - The group-key of the cart item.
     *
     * @returns {Promise}
     */
    removeItem({ commit, dispatch }, { sku, groupKey }) {
      if (!sku || !groupKey) {
        dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

        return Promise.reject(new Error(`No sku or groupKey provided (sku: ${sku} / groupKey: ${groupKey})`));
      }

      commit('setRequestIsRunningState', true);

      return api.delete(`${i18n.t('urls.cart')}/1/${sku}/${groupKey}`)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('data', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Sends a update quantities request with a list of all updated quantities.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.state - The current state object.
     * @param {Object} context.commit - The current commit object.
     *
     * @returns {Promise}
     */
    updateItems({ state, commit }) {
      const items = state.changedCartEntries;

      if (!Array.isArray(items) || !items.length) {
        return Promise.reject(new Error('Empty change list'));
      }

      commit('setRequestIsRunningState', true);

      return api.patch(`${i18n.t('urls.cart')}/1/change-quantity`, items)
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data) {
            commit('data', response.data.data);
            commit('resetTemporaryCart');

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Update function for all the meta data, all the payload data is optional.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} context.state - The current state object.
     * @param {Object} payload - The payload data.
     * @param {String} [payload.selectedShipmentMethodId] - The id of the shiping method.
     * @param {String} [payload.pickupId] - The id of the pickup location.
     * @param {Number} [payload.contractId] - The id of the contract.
     * @param {Number} [payload.addressId] - The id of the address.
     * @param {Object} [payload.shippingAddress] - The shipping address object.
     *
     * @returns {Promise}
     */
    updateMetaData({ commit, state }, {
      selectedShipmentMethodId,
      pickupId,
      contractId,
      addressId,
      shippingAddress,
    }) {
      const data = {
        selectedShipmentMethodId: selectedShipmentMethodId || state.cart.selectedShipmentMethodId,
        pickupLocationErpId: pickupId || state.cart.pickupLocationErpId,
        contractId: contractId || state.cart.contractId,
        addressId: !shippingAddress ? addressId || state.cart.addressId : null,
      };

      if (shippingAddress) {
        data.shippingAddress = shippingAddress;
      }

      commit('setRequestIsRunningState', true);

      return api.post(`${i18n.t('urls.cartData')}/1`, data)
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data) {
            commit('data', response.data.data);
            commit('resetTemporaryCart');
            commit('setTemporarySelectedShippingMethod', '');
            commit('setTemporarySelectedPickupLocation', '');

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Sends a quick add to cart request and updates the full cart.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.dispatch - The current dispatch object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} payload - The payload data.
     * @param {Object} payload.erp - The erp number of the product you want to add.
     * @param {Object} payload.quantity - The quantity you want to add.
     *
     * @returns {Promise}
     */
    quickAddToCart({ commit, dispatch }, { erp, quantity }) {
      if (!erp || !quantity || quantity <= 0) {
        dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

        return Promise.reject(new Error(`No erp or quantity provided (erp: ${erp} / quantity:${quantity}).`));
      }

      commit('setQuickAddToCartProgress', true);

      return api.post(`${i18n.t('urls.cart')}/1/quick-add`, { productNumber: erp, quantity }) // TODO: Replace id of cart.
        .then((response) => {
          commit('setQuickAddToCartProgress', false);

          if (response.data && response.data.data) {
            commit('data', response.data.data);
            commit('resetTemporaryCart');

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
      });
    },

    /**
     * Sends request to replace the current item with a new one.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} context.dispatch - The dispatch context method.
     * @param {Object} payload - The payload data.
     * @param {String} payload.oldSku - The sku of the product you want to remove.
     * @param {String} payload.newSku - The sku of the new product.
     * @param {String} payload.quantity - Amount of product units to be added.
     * @param {String} payload.groupKey - The group-key of the cart item.
     *
     * @returns {Promise}
     */
    replaceItem({ commit, dispatch }, {
      oldSku,
      groupKey,
      newSku,
      quantity,
    }) {
      if (!oldSku || !groupKey || !newSku) {
        dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

        return Promise
          .reject(new Error(`No sku or groupKey provided (old sku: ${oldSku} / groupKey: ${groupKey}) / new sku: ${newSku}`));
      }

      const data = {
        sku: newSku,
        quantity: quantity > 0 ? quantity : 1,
      };

      return api.patch(`${i18n.t('urls.cart')}/1/${oldSku}/${groupKey}/replace`, data) // TODO: Replace id of cart.
        .then((response) => {
          if (response.data && response.data.data) {
            commit('data', response.data.data);
            commit('resetTemporaryCart');

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
      });
    },

    /**
     * Update function for the temporary checkout data.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit function.
     * @param {Object} context.state - The current state object.
     * @param {Object} context.getters - The vuex module getters.
     * @param {Boolean} [preventUpdate = true] - Prevents update of cart content after successful request.
     *
     * @returns {Promise}
     */
    updateCheckoutData({ commit, state, getters }, preventUpdate = true) {
      if (!getters.getHasTemporaryCheckoutData) {
        return Promise.resolve();
      }

      commit('setRequestIsRunningState', true);

      return api.post(`${i18n.t('urls.cartData')}/1`, state.temporaryCheckoutData) // TODO: Replace id of cart.
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data) {
            if (!preventUpdate) {
              commit('data', response.data.data);
              commit('resetTemporaryCheckout');
            }

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Place order action.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     *
     * @returns {Promise}
     */
    placeOrder({ commit }) {
      commit('setRequestIsRunningState', true);

      return api.post(`${i18n.t('urls.placeOrder')}`, { orderType: 'Order' })
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data) {
            return response.data.data;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },
  },
};
