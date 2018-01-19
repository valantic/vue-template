import vueBemCn from 'vue-bem-cn';
import vueAxios from '../plugins/axios';

export default {
  install(Vue) {
    Vue.use(vueAxios);
    Vue.use(vueBemCn, {
      hyphenate: true,
    });
  },
};

