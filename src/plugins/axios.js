import axios from 'axios/index';

export { axios };

export default {
  install(app /* , options */) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$axios = axios;
  },
};
