import Vue from 'vue';
import Vuex from 'vuex';

// modules
import cart from './modules/cart';
import catalog from './modules/catalog';
import customer from './modules/customer';
import navigation from './modules/navigation';
import product from './modules/product';
import session from './modules/session';
import wishlist from './modules/wishlist';

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * state, actions & getters
   * must be defined within modules
   * */
  modules: {
    cart,
    catalog,
    customer,
    navigation,
    product,
    session,
    wishlist,
  },
});
