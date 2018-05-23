import Vue from 'vue';
import VueAxios from '@/setup/plugins/axios';
import VueBemCn from 'vue-bem-cn';
import Vuedals from 'vuedals';

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

Vue.use(VueAxios);
Vue.use(Vuedals);
Vue.use(VueBemCn, {
  hyphenate: true,
});
