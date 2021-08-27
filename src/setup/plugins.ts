/* eslint-disable import/first */
import Vue from 'vue';
import VModal from 'vue-js-modal';
import PortalVue from 'portal-vue';
import Vuelidate from 'vuelidate';
import VueAxios from '@/plugins/axios';
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import eventBus from '@/plugins/event-bus';
import viewport from '@/plugins/viewport';
import api from '@/plugins/api';
// import dayjs from '@/plugins/dayjs';

export default [
  [i18n],
  [store],
  [resizeEnd],
  [VueAxios],
  [Vuelidate],
  [viewport],
  [api],
  // please note: if you change the VueBemCn methodName, adjust the global definition in shims-vuex.d.ts
  [VueBemCn, {
    hyphenate: true,
  }],
  [directives],
  [components],
  // [dayjs]
];
