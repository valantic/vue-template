import '../src/setup/scss/themes/theme-01.scss';
import '../src/setup/_scss.scss'
import { app } from '@storybook/vue3';
import vuePlugins from '../src/setup/plugins';

// @see https://storybook.js.org/docs/vue/writing-stories/decorators#context-for-mocking
vuePlugins.forEach(([plugin, pluginOptions]) => {
  app.use(plugin, pluginOptions);
});


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
