import axios from 'axios';

export default {
  install(Vue /* , options */) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$axios = axios;
  },
};
