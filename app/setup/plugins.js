/* eslint-disable import/first */
import Vue from 'vue';
import VueAxios from '@/setup/plugins/axios';
import VueBem from '@verstaerker/vue-bem';
import VModal from 'vue-js-modal';
import PortalVue from 'portal-vue';
import Tabs from 'vue-tabs-component';
import { Vuetify } from 'vuetify';
import resizeEnd from './plugins/resize-end';
import eventBus from './plugins/event-bus';
import moment from './plugins/moment';
import viewport from './plugins/viewport';
import modal from './plugins/modalStack';

// Polyfills and self executing
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // Lazy sizes attribute change observer
import './polyfills';

Vue.use(resizeEnd);
Vue.use(VueAxios);
Vue.use(Vuetify);
Vue.use(eventBus);
Vue.use(moment);
Vue.use(viewport);
Vue.use(modal);

Vue.use(VueBem);
Vue.use(PortalVue);
Vue.use(VModal);
Vue.use(Tabs);
