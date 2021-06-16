/* eslint-disable import/first */
import VueAxios from '@/plugins/axios';
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import viewport from '@/plugins/viewport';
import modal from '@/plugins/modalStack';
import api from '@/plugins/api';
import store from '@/store/index'; // MUST come after i18n because of build order.
import i18n from '@/setup/i18n'; // MUST come after i18n because of build order.
// import dayjs from '@/plugins/dayjs';
import directives from '@/setup/directives';
import components from '@/setup/components';

export default [
  [i18n],
  [store],
  [resizeEnd],
  [VueAxios],
  [viewport],
  [modal],
  [api],
  [VueBemCn, {
    hyphenate: true,
  }],
  [directives],
  [components],
  // [dayjs]
];
