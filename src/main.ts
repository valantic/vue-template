import 'core-js/stable';

// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
import './setup/styles.scss';

import { createApp, Plugin } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia';
import api from '@/stores/plugins/api';
import options from '@/setup/options';
import plugins from '@/setup/plugins';

const styleguideOptions = import.meta.env.MODE !== 'production'
  ? import.meta.glob('@/setup/styleguide.options.ts', { eager: true })['/src/setup/styleguide.options.ts']
  : null;

const vueOptions = import.meta.env.MODE !== 'production'
  ? { ...options, ...styleguideOptions.options }
  : options;

const vuePlugins = import.meta.env.MODE !== 'production'
  ? [...plugins, ...styleguideOptions.plugins]
  : plugins;

const app = createApp(vueOptions);
const pinia = createPinia();

pinia.use(api);

vuePlugins.forEach(([plugin, pluginOptions]) => {
  app.use(plugin as Plugin, pluginOptions);
});

app.use(pinia);

app.mount('#app');
