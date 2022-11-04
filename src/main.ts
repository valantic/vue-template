import 'core-js/stable';

// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
import './setup/styles.scss';

// vendor styles

import { createApp, Plugin } from 'vue';
import { createPinia } from 'pinia';
import api from '@/stores/plugins/api';
import options from '@/setup/options';
import plugins from '@/setup/plugins';

const vueOptions = process.env.NODE_ENV !== 'production'
  ? { ...options, ...require('./setup/styleguide.options').options } // eslint-disable-line global-require, @typescript-eslint/no-var-requires
  : options;

const vuePlugins = process.env.NODE_ENV !== 'production'
  ? [...plugins, ...require('./setup/styleguide.options').plugins] // eslint-disable-line global-require, @typescript-eslint/no-var-requires
  : plugins;

const app = createApp(vueOptions);
const pinia = createPinia();

pinia.use(api);

vuePlugins.forEach(([plugin, pluginOptions]) => {
  app.use(plugin as Plugin, pluginOptions);
});

app.use(pinia);

app.mount('#app');
