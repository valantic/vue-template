import Vue from 'vue';
import VueBemCn from 'vue-bem-cn';
import VueAxios from '@/setup/plugins/axios';
import VueI18n from 'vue-i18n';

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

import components from './components';
import './styleguide.options';

Vue.use(VueI18n);
Vue.use(components);
Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});
