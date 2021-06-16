import { Plugin } from 'vue';
import api from '@/helpers/api';

/**
 * Adds a reference for the API helper to the Vue instance.
 */
const plugin: Plugin = {
  install(app /* , options */) {
    app.config.globalProperties.$api = api;
  },
};

export default plugin;
