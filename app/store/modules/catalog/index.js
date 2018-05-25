import productListData from '@/store/modules/catalog/mock/productlist';
import productData from '@/store/modules/product/mock/product';
import api from "@/store/utils/api";

export default {
  namespaced: true,
  state: {
    /**
     * @property {Object}   Stores productlist data
     */
    productlist: productListData,
    product: productData,
  },
  getters: {
    /**
     * Gets a productlist
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Productlist data
     */
    productlist: state => state.productlist,

    product: state => state.product,
  },
  mutations: {},
  actions: {
    /**
     *
     * @param state
     * @param commit
     * @returns {Promise<T>}
     */
    fetchProduct({ state, commit }) {
      return api.post('/product/multi-get', { sku: state.product.sku, quantity: 1 })
        .then((response) => {
          if (response && response.data && response.data.products) {
            commit('setProduct', response.data[0]);

            return response;
          }

          throw new Error('apiFailure');
      });
    },
  },
};

