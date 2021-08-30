/* eslint-disable import/first */
import Vuex from 'vuex'; // MUST come before the store because of build order.
import Vuelidate from 'vuelidate';
import VueAxios from '@/plugins/axios';
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import eventBus from '@/plugins/event-bus';
import viewport from '@/plugins/viewport';
import api from '@/plugins/api';
import i18n from '@/setup/i18n'; // MUST come after i18n because of build order.
// import dayjs from '@/plugins/dayjs';
import directives from '@/setup/directives';
import components from '@/setup/components';

export default [
  [Vuex],
  [i18n],
  [resizeEnd],
  [VueAxios],
  [Vuelidate],
  [viewport],
  [api],
  // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
  [VueBemCn, {
    hyphenate: true,
  }],
  [directives],
  [components],
  // [dayjs]
];
