/* eslint-disable import/first */
import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueAxios from '@/plugins/axios';
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import eventBus from '@/plugins/event-bus';
import viewport from '@/plugins/viewport';
import modal from '@/plugins/modalStack';
import api from '@/plugins/api';
// import dayjs from '@/plugins/dayjs';

// Self executing

Vue.use(resizeEnd);
Vue.use(VueAxios);
Vue.use(eventBus);
Vue.use(viewport);
Vue.use(modal);
Vue.use(api);
Vue.use(VueBemCn, {
  hyphenate: true,
});
Vue.use(VModal);
// Vue.use(dayjs);
