import api from '@/helpers/api';

/**
 * Adds a reference for the API helper to the Vue instance.
 */
export default {
  install(Vue /* , options */) {
    Vue.prototype.$api = api;
  },
};
