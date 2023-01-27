/* eslint-disable import/first */
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import viewport from '@/plugins/viewport';
import i18n from '@/setup/i18n'; // MUST come after i18n because of build order.
import directives from '@/setup/directives';
import components from '@/setup/components';
import bodyScroll from '@/plugins/body-scroll';
// import dayjs from '@/plugins/dayjs';
// import VueFocus from '@/plugins/v-focus';

export default [
  [i18n],
  [resizeEnd],
  [viewport],
  [VueBemCn, { // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
    hyphenate: true,
  }],
  [directives],
  [components],
  [bodyScroll],

  // [VueFocus],
  // [dayjs]
];
