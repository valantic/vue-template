import Vue from 'vue';
import store from '@/store/index';
import VueAxios from '@/setup/plugins/axios';
import VueBemCn from 'vue-bem-cn';

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

import { i18n } from './i18n';

Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});

export default {
  el: '#app',
  store,
  i18n,
};
