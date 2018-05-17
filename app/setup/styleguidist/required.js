import Vue from 'vue';
import VueBemCn from 'vue-bem-cn';
import VueAxios from '@/setup/plugins/axios';
import components from '@/setup/components';

// Polyfills and self executing
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import '@/setup/lib/ls.attrchange'; // lazy sizes attribute change observer
import '@/setup/styleguide.options';

Vue.use(components);
Vue.use(VueAxios);
Vue.use(VueBemCn, {
  hyphenate: true,
});
