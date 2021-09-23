/* eslint-disable import/first */
import Vuex from 'vuex'; // MUST come before the store because of build order.
import VueAxios from '@/plugins/axios';
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import viewport from '@/plugins/viewport';
import api from '@/plugins/api';
import i18n from '@/setup/i18n'; // MUST come after i18n because of build order.
import directives from '@/setup/directives';
import components from '@/setup/components';
// import dayjs from '@/plugins/dayjs';
// import VueFocus from '@/plugins/v-focus';

export default [
  [Vuex],
  [i18n],
  [resizeEnd],
  [VueAxios],
  [viewport],
  [api],
  [VueBemCn, { // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
    hyphenate: true,
  }],
  [directives],
  [components],

  // [VueFocus],
  // [dayjs]
];
