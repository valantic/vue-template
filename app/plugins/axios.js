import axios from 'axios';

export default {
  axios,
  install(Vue /* , options */) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$axios = axios;
  },
};
