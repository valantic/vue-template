import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import '../src/setup/scss/themes/theme-01.scss';
import '../src/setup/styles.scss';
import { createPinia } from 'pinia';
import api from '@/stores/plugins/api';
import vuePlugins from '../src/setup/plugins';

const pinia = createPinia();

pinia.use(api);

setup((app) => {
  // @see https://storybook.js.org/docs/vue/writing-stories/decorators#context-for-mocking
  vuePlugins.forEach(({ plugin, options }) => app.use(plugin, options));

  app.use(pinia);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
};

export default preview;
