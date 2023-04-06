// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
import './setup/styles.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import api from './stores/plugins/api';
import options from './setup/options';
import plugins from './setup/plugins';

const vuePlugins = plugins;
const pinia = createPinia();
let vueOptions = options;

if (import.meta.env.DEV) {
  const styleguideOptions = await import('@!production/setup/styleguide'); // eslint-disable-line import/no-webpack-loader-syntax

  vueOptions = {
    ...vueOptions,
    ...styleguideOptions.options,
  };

  vuePlugins.push(...styleguideOptions.plugins);
}

const app = createApp(vueOptions);

pinia.use(api);

vuePlugins.forEach(({ plugin, options: pluginOptions }) => app.use(plugin, pluginOptions));

app.use(pinia);

app.mount('#app');
