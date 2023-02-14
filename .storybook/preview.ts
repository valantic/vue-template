/* eslint-disable import/prefer-default-export */
import '../src/setup/scss/themes/theme-01.scss';
import '../src/setup/styles.scss';
import { app } from '@storybook/vue3';
import vuePlugins from '../src/setup/plugins';

// @see https://storybook.js.org/docs/vue/writing-stories/decorators#context-for-mocking
vuePlugins.forEach(({ plugin, options }) => app.use(plugin, options));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
