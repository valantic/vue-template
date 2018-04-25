import Vue from 'vue';
import VueBemCn from 'vue-bem-cn';
import VueAxios from '@/setup/plugins/axios';
// NOTE: VueI18n is not supported by vue-styleguidist

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // lazy sizes attribute change observer

import components from './components';
import './styleguide.options';

Vue.use(components);
Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});

export default {
  methods: {
    // eslint-disable-next-line id-length
    onClick(event) {
      // eslint-disable-next-line no-console
      console.log('You clicked:', event.target);
    }
  }
};
