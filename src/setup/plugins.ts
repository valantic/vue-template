/* eslint-disable import/first */
import { Plugin } from 'vue';
import VueBemCn from '@/plugins/vue-bem-cn';
import resizeEnd from '@/plugins/resize-end';
import viewport from '@/plugins/viewport';
import i18n from '@/setup/i18n'; // MUST come after i18n because of build order.
import directives from '@/setup/directives';
import components from '@/setup/ssr-components';
import dayjs from '@/plugins/dayjs';
// import VueFocus from '@/plugins/v-focus';
// import tooltip from '@/plugins/tooltip';

export interface ICustomPlugin {
  plugin: Plugin,
  options?: Record<string, unknown>
}

export default [
  { plugin: i18n },
  { plugin: resizeEnd },
  { plugin: viewport },
  {
    plugin: VueBemCn,
    options: { // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
      hyphenate: true,
    },
  },
  { plugin: directives },
  { plugin: components },
  // { plugin: tooltip},
  // { plugin: VueFocus},
  { plugin: dayjs },
] satisfies ICustomPlugin[];
