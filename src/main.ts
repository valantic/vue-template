import 'core-js/stable';

// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
// NOTE: this is not working for styleguidist. There you need to add style imports to the required configuration
import './setup/_scss.scss';

// vendor styles

import { createApp, Plugin } from 'vue';
import { createPinia } from 'pinia';
import api from '@/stores/plugins/api';
import options from '@/setup/options';
import plugins from '@/setup/plugins';
import { options as styleguideOptions, router } from './setup/styleguide.options';

const vueOptions = process.env.NODE_ENV !== 'production'
  ? { ...options, ...styleguideOptions }
  : options;

const app = createApp(vueOptions);
const pinia = createPinia();

pinia.use(api);

plugins.forEach(([plugin, pluginOptions]) => {
  app.use(plugin as Plugin, pluginOptions);
});

if (process.env.NODE_ENV !== 'production') {
  app.use(router);
}

app.use(pinia);

app.mount('#app');
