import { VUEX_COMMIT_ROOT_CONFIG } from '@/setup/globals';
import { i18n } from '@/setup/i18n';
import api from '../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object} - Stores categories fetched from the api.
     */
    categories: null,

    /**
     * @type {Boolean} - Indicates if ajax call for categories has been made.
     */
    categoriesRequestIsSent: false,

    /**
     * @type {Boolean} - Indicates if categories have been fetched.
     */
    categoriesLoaded: false,

    /**
     * @type {Object} Stores products data.
     */
    products: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/products').default // eslint-disable-line global-require
      : null,

    /**
     * @property {Object} Stores facets (collection of filters)
     */
    facets: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/facets').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Object} Stores related products for every product.
     */
    productRelations: {},

    /**
     * @type {Array} Stores all productIds for which a request is pending.
     */
    loadingProductRelations: [],

    /**
     * @type {Object} Stores price data for each product.
     */
    productPrices: {},

    /**
     * @type {Number|String} Stores current categoryId.
     */
    categoryId: null,

    /**
     * @type {Array} Stores all available sort options.
     */
    sortOptions: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/sortOptions').default // eslint-disable-line global-require
      : null,

    /**
     * @type {String} Stores sorting string.
     */
    sort: '',

    /**
     * @type {Object} Stores pagination data.
     */
    pagination: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/pagination').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Boolean} Stores if products are being loaded.
     */
    isLoading: false,

    /**
     * @type {Array} Stores category children for category page.
     */
    categoryChildren: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/categoryChildren').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Array} Stores category siblings for category page.
     */
    categorySiblings: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/categorySiblings').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Object} Stores the category parent for category page.
     */
    categoryParent: process.env.NODE_ENV !== 'production'
      ? require('@/store/modules/catalog/mock/categoryParent').default // eslint-disable-line global-require
      : null,
  },

  getters: {
    /**
     * Gets all facets that are available for current page.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    facets: state => state.facets,

    /**
     * Gets categories.
     *
     * @param {Object} state - Current state of the store.
     *
     * @returns {Object}
     */
    categories: state => state.categories,

    /**
     * Gets loading state of categories tree.
     *
     * @param {Object} state - Current state of the store.
     *
     * @returns {Boolean}
     */
    categoriesLoaded: state => state.categoriesLoaded,

    /**
     * Gets the products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    products: state => state.products,

    /**
     * Gets the prices for the products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    productPrices: state => state.productPrices,

    /**
     * Gets all related products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    productRelations: state => state.productRelations,

    /**
     * Gets all productIds for which related products are beeing loaded.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    loadingProductRelations: state => state.loadingProductRelations,

    /**
     * Gets the current categoryId.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number|String}
     */
    categoryId: state => state.categoryId,

    /**
     * Gets the sort options.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    sortOptions: state => state.sortOptions,

    /**
     * Gets the sort value.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    sort: state => state.sort,

    /**
     * Gets pagination data.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    pagination: state => state.pagination,

    /**
     * Returns if products are being loaded.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    isLoading: state => state.isLoading,

    /**
     * Gets category children.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    categoryChildren: state => state.categoryChildren,

    /**
     * Gets category siblings.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    categorySiblings: state => state.categorySiblings,

    /**
     * Gets the category parent.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    categoryParent: state => state.categoryParent,
  },
  mutations: {
    /**
     * Sets the related products.
     *
     * @param {Object} state - The current state.
     * @param {Object} payload - Payload containing information for the store.
     * @param {String} payload.productKey - ProductKey for which the related products should be set.
     * @param {Array} payload.data - Array of products which should set for the given productId.
     */
    setProductRelations(state, payload) {
      state.productRelations = {
        ...state.productRelations,
        [payload.productKey]: payload.data,
      };
    },

    /**
     * Removes all product relations for all products.
     *
     * @param {Object} state - The current state.
     */
    removeAllProductRelations(state) {
      state.productRelations = {};
    },

    /**
     * Sets loaded status for related products request.
     *
     * @param {Object} state - Current state.
     * @param {Object} payload - Payload object.
     * @param {String|Number} payload.productKey - ProductKey for which the loading state should be set.
     * @param {Boolean} payload.status - Loading status which should be set.
     */
    setLoadingProductRelations(state, payload) {
      const { productKey, status } = payload;
      const index = state.loadingProductRelations.indexOf(productKey);

      if (status && index === -1) {
        state.loadingProductRelations.push(productKey);
      } else if (index >= 0) {
        state.loadingProductRelations.splice(index, 1);
      }
    },

    /**
     * Initial products data provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Object} data - Products data.
     */
    dataProducts(state, data) {
      if (!data) {
        return;
      }

      const { facets, products, sorting } = data;

      if (products) {
        state.products = products;
      }

      if (data.pagination) {
        state.pagination = {
          currentPage: data.pagination.currentPage,
          maxPage: data.pagination.maxPage,
          numFound: data.pagination.numFound,
          itemsPerPage: data.pagination.currentItemsPerPage,
        };
      }

      if (Array.isArray(facets)) {
        state.facets = facets.filter(facet => !facet.config || facet.config.type !== 'price-range'); // TODO: should be filtered by backend.
      }

      if (sorting) {
        state.sortOptions = sorting.sortParams || null;
        state.sort = sorting.currentSortParam || '';
      }
    },

    addProducts(state, data) {
      if (data && data.products) {
        state.products.push(...data.products);
      }
    },

    /**
     * Update facets.
     * TODO: Adapt sanitization in the future, when there are filter components for different types of data. (e.g. price span)
     *
     * @param {Object} state - Current state
     * @param {Object} facets - Facets data
     */
    updateFacets(state, facets) {
      if (state.facets) {
        facets.forEach((facet, index, object) => {
          if (facet.config.type === 'price-range') {
            object.splice(index, 1);
          }
        });

        state.facets = facets;
      }
    },

    /**
     * Initial categoryId provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Number|String} categoryId - Category Id from spryker.
     */
    dataCategoryId(state, categoryId) {
      state.categoryId = categoryId;
    },

    /**
     * Sets the product prices.
     *
     * @param {Object} state - Current state object.
     * @param {Object} data - Product price data.
     */
    setProductPrices(state, data) {
      if (data && data.products) {
        data.products.map((price) => {
          window.vm.$set(state.productPrices, price.sku, price);
        });
      }
    },

    /**
     * Sets the sort value.
     *
     * @param {Object} state - Current state object.
     * @param {String} sort - Current sort value.
     */
    setSort(state, sort) {
      state.sort = sort || '';
    },

    /**
     * Sets categories data.
     *
     * @param {Object} state - Current state of the store.
     * @param {Object} categories - Categories fetched from the api.
     */
    setCategories(state, categories) {
      state.categories = categories;
    },

    /**
     * Sets if categories ajax call has been made.
     *
     * @param {Object} state - Current state of the store.
     * @param {Boolean} categoriesRequestIsSent - Categories loading state.
     */
    setcategoriesRequestIsSent(state, categoriesRequestIsSent) {
      state.categoriesRequestIsSent = categoriesRequestIsSent;
    },

    /**
     * Sets if categories are loaded.
     *
     * @param {Object} state - Current state of the store.
     * @param {Boolean} categoriesLoaded - Categories loaded state.
     */
    setCategoriesLoaded(state, categoriesLoaded) {
      state.categoriesLoaded = categoriesLoaded;
    },

    /**
     * Sets the current page.
     *
     * @param {Object} state - Current state object.
     * @param {Number} page - Current page.
     */
    setCurrentPage(state, page) {
      window.vm.$set(state.pagination, 'currentPage', page);
    },

    /**
     * Sets the loading products state.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isLoading - If products are currently being loaded.
     */
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },

    /**
     * Initial category children data provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Array} categoryChildren - Category children data.
     */
    dataCategoryChildren(state, categoryChildren) {
      state.categoryChildren = categoryChildren;
    },

    /**
     * Initial category siblings data provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Array} categorySiblings - Category siblings data.
     */
    dataCategorySiblings(state, categorySiblings) {
      state.categorySiblings = categorySiblings;
    },

    /**
     * Initial category parent data provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Object} categoryParent - Category parent data.
     */
    dataCategoryParent(state, categoryParent) {
      state.categoryParent = categoryParent;
    },
  },
  actions: {
    /**
     * Fetches navigation catalog items.
     *
     * @param {Object} commit - Exposes methods/properties on the store instance.
     *
     * @returns {Promise}
     */
    fetchNavigation({ commit, state }) {
      if (!state.categoriesRequestIsSent) {
        commit('setcategoriesRequestIsSent', true);

        return api.get(i18n.t('urls.category'))
          .then((response) => {
            if (response.data && response.data.data && response.data.data.categories) {
              commit('setCategories', response.data.data.categories);

              return response;
            }

            return Promise.reject(new Error('apiFailure'));
          })
          .finally(() => {
            commit('setCategoriesLoaded', true);
        });
      }

      return Promise.resolve();
    },

    /**
     * Fetches additional products from spryker.
     *
     * @param {Object} context - Context object.
     * @param {Object} context.commit - The mutation commit method of Vuex.
     * @param {Object} context.dispatch - The action dispatch method of Vuex.
     * @param {Object} payload - Request payload object.
     * @param {String|Number|null} payload.categoryId - CategoryId for which products should be loaded.
     * @param {String|null} payload.sort - Sorting for products.
     * @param {Number|null} payload.page - Current page for request.
     * @param {Number|null} payload.itemsPerPage - Items per page for request.
     * @param {Object|null} payload.facets - Selected facets for request.
     * @param {Boolean} payload.shouldExtend - Defines if response should extend current products list.
     *
     * @returns {Promise|null}
     */
    fetchProducts({ commit, dispatch }, payload) {
      if (payload) {
        commit('setIsLoading', true);

        return api.post(i18n.t('urls.product'), {
          sort: payload.sort,
          categoryId: payload.categoryId,
          page: payload.page,
          ipp: payload.itemsPerPage,
          filters: payload.filters,
        })
          .then((response) => {
            const responseData = response.data && response.data.data;

            if (responseData) {
              if (payload.shouldExtend) {
                commit('setCurrentPage', responseData.pagination.currentPage);
                commit('addProducts', responseData);
              } else {
                commit('dataProducts', responseData);
              }

              return response;
            }

            dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

            return Promise.reject(new Error('apiFailure'));
          })
          .finally(() => {
            commit('setIsLoading', false);
        });
      }

      return null;
    },

    /**
     * Removes all products from array.
     *
     * @param {Object} context - Context object of the store.
     */
    removeProducts({ commit }) {
      commit('dataProducts', {
        products: [],
      });
    },

    /**
     * Fetches the relations for the given product and type.
     *
     * @param {Object} state - Current state object.
     * @param {Object} data - Product price data.
     */
    setProductPrices(state, data) {
      if (data) {
        data.map((price) => {
          window.vm.$set(state.productPrices, price.sku, price);
        });
      }
    },

    /**
     * Initial sort options provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Object} sortOptions - Sort options object.
     */
    dataSortOptions(state, sortOptions) {
      state.sortOptions = sortOptions || null;
    },

    /**
     * Fetches the relations for the given product and type.
     *
     * @param {Object} context - Context object of the store.
     * @param {Function} context.commit - The mutation commit method of Vuex.
     * @param {Function} context.dispatch - The action dispatch method of Vuex.
     * @param {Object} payload - Payload object.
     * @param {String|Number} payload.productId - The productId of which we need to fetch the relations.
     * @param {String|Number} payload.productGroupKey - The productGroupKey of which we need to fetch the relations.
     * @param {String} payload.type - The type for which we need to fetch the relations.
     * Valid options for type are:
     * `consists-products`, `product-accessory`, `product-necessary-accessory`, `product-alternative`, `product-replacement`.
     *
     * @returns {Promise}
     */
    fetchRelations({ commit, dispatch }, { productId, productGroupKey, type }) {
      const productKey = `${productId}:${productGroupKey}`;

      commit('setLoadingProductRelations', { productKey, status: true });

      return api.get(`${i18n.t('urls.productRelations')}/${productId}/${type}`)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('setProductRelations', {
              productKey,
              data: response.data.data,
            });

            commit('setLoadingProductRelations', { productKey, status: false });

            return response;
          }

          dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

          return Promise.reject(new Error('apiFailure'));
        }); // eslint-disable-line vue/script-indent
    },

    /**
     * Sets the sort value.
     *
     * @param {Object} state - Current state object.
     * @param {String} sort - Current sort value.
     */
    setSort(state, sort) {
      state.sort = sort || '';
    },

    /**
     * Resets the related products for the given productKey.
     *
     * @param {Object} context - The context object of the store.
     * @param {String} productKey - The productKey of which we need to remove the related products.
     */
    removeRelations({ commit }, productKey) {
      commit('setProductRelations', {
        productKey,
        data: null,
      });
    },

    /**
     * Fetches the prices for the given products.
     *
     * @param {Object} context - The context object of the store.
     * @param {Function} context.commit - The mutation commit method of Vuex.
     * @param {Function} context.rootGetters - The root getter method of Vuex.
     * @param {Function} context.dispatch - The action dispatch method of Vuex.
     * @param {Array} skus - Skus of the products of which the prices should be fetched.
     *
     * @returns {Object | null}
     */
    fetchPrices({ commit, rootGetters, dispatch }, skus) {
      if (skus.length && rootGetters['session/isLoggedInUser']) {
        return api.post(`${i18n.t('urls.product')}/multi-get`, skus)
          .then((response) => {
            if (response.data && response.data.data) {
              commit('setProductPrices', response.data.data);

              return response;
            }

            dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

            return Promise.reject(new Error('apiFailure'));
        });
      }

      return null;
    },
  },
};
