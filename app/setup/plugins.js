import VueBemCn from 'vue-bem-cn';
import VueAxios from './plugins/axios';
import VueI18n from './plugins/vue-i18n';

export default {
  install(Vue /* , options */) {
    Vue.use(VueI18n);
    Vue.use(VueAxios);
    Vue.use(VueBemCn, {
      hyphenate: true,
    });
  },
};

