import Vue from 'vue';
import VueBemCn from 'vue-bem-cn';
import VueI18n from 'vue-i18n';
import VueAxios from '@/setup/plugins/axios';
import store from '@/store/index';
import { I18N_FALLBACK, I18N_FALLBACK_MESSAGES } from './i18n';

Vue.use(VueI18n);
Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});

const i18n = new VueI18n({
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
});

export default {
  el: '#app',
  store,
  i18n,
};
