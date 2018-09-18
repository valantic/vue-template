/* eslint-disable import/first */
import Vue from 'vue';
import VueAxios from '@/setup/plugins/axios';
import VueBemCn from 'vue-bem-cn';
import { Vuetify } from 'vuetify';
import resizeEnd from './plugins/resize-end';
import eventBus from './plugins/event-bus';
import viewport from './plugins/viewport';

// Polyfills and self executing
import cssVars from 'css-vars-ponyfill';
import VModal from 'vue-js-modal';
import PortalVue from 'portal-vue';
import Tabs from 'vue-tabs-component';
import 'intersection-observer';
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // Lazy sizes attribute change observer
import './polyfills';

/**
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});

Vue.use(resizeEnd);
Vue.use(VueAxios);
Vue.use(Vuetify);
Vue.use(eventBus);
Vue.use(viewport);

Vue.use(VueBemCn, {
  hyphenate: true,
});
Vue.use(PortalVue);
Vue.use(VModal);
Vue.use(Tabs);
