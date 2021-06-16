import axios from 'axios/index';
import { Plugin } from 'vue';

export { axios };

const plugin: Plugin = {
  install(app /* , options */) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$axios = axios;
  },
};

export default plugin;
