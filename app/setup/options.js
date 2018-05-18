import Vue from 'vue';
import store from '@/store/index';
import VueI18n from 'vue-i18n';
import VueAxios from '@/setup/plugins/axios';
import VueBemCn from 'vue-bem-cn';

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

import { I18N_FALLBACK, I18N_FALLBACK_MESSAGES, numberFormats } from './i18n';

Vue.use(VueI18n);
Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});

export const i18n = new VueI18n({
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
  numberFormats,
});

export default {
  el: '#app',
  store,
  i18n,
};
