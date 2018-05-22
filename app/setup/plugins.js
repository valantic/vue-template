import Vue from 'vue';
import VueAxios from '@/setup/plugins/axios';
import VueBemCn from 'vue-bem-cn';

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});
