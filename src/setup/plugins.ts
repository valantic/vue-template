import { Plugin } from 'vue';
// MUST come after i18n because of build order.
import directives from '@/setup/directives';
import i18n from '@/setup/i18n';
import components from '@/setup/ssr-components';
import dayjs from '@/plugins/dayjs';
import resizeEnd from '@/plugins/resize-end';
import tooltip from '@/plugins/tooltip';
import VueFocus from '@/plugins/v-focus';
import viewport from '@/plugins/viewport';
import VueBemCn from '@/plugins/vue-bem-cn';

export type CustomPlugin = {
  plugin: Plugin;
  options?: Record<string, unknown>;
};

export default [
  { plugin: i18n },
  { plugin: resizeEnd },
  { plugin: viewport },
  {
    plugin: VueBemCn,
    options: {
      // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
      hyphenate: true,
    },
  },
  { plugin: directives },
  { plugin: components },
  { plugin: VueFocus },
  { plugin: dayjs },
  tooltip,
] satisfies CustomPlugin[];
