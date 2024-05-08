import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import vuePlugins from '../src/setup/plugins';
import '../src/setup/scss/themes/theme-01.scss';
import '../src/setup/styles.scss';

setup((app) => {
  // @see https://storybook.js.org/docs/vue/writing-stories/decorators#context-for-mocking
  vuePlugins.forEach(({ plugin, options }) => app.use(plugin, options));
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
  },
};

export default preview;
