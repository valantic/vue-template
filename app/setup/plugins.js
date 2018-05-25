import Vue from 'vue';
import VueAxios from '@/setup/plugins/axios';
import VueBemCn from 'vue-bem-cn';
import Vuedals from 'vuedals';

// Polyfills and self executing
import cssVars from 'css-vars-ponyfill';
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

/**
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});

Vue.use(VueAxios);
Vue.use(Vuedals);
Vue.use(VueBemCn, {
  hyphenate: true,
});
