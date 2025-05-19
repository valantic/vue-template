import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import vuePlugins from '../src/setup/plugins';
import '../src/setup/scss/themes/theme-default.scss';
import '../src/setup/styles.scss';

setup((app) => {
  // @see https://storybook.js.org/docs/vue/writing-stories/decorators#context-for-mocking
  vuePlugins.forEach(({ plugin, options }) => app.use(plugin, options));
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  tags: ['autodocs'],
};

// eslint-disable-next-line vue/require-direct-export
export default preview;
