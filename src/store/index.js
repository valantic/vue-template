import Vue from 'vue';
import Vuex from 'vuex';
import camelCase from 'lodash/camelCase';

const requireModule = require.context('./modules/', true, /index\.js/);
const modules = requireModule.keys().reduce((accumulator, fileName) => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\/index\.js)/g, ''));

  accumulator[moduleName] = requireModule(fileName).default;

  return accumulator;
}, {});

Vue.config.devtools = process.env.NODE_ENV !== 'production' || process.env.HAS_WATCHER;

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * state, actions & getters
   * must be defined within modules
   * */
  modules
});
