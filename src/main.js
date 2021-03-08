// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
// NOTE: this is not working for styleguidist. There you need to add style imports to the required configuration
import './setup/_scss.scss';

import { createApp } from 'vue/dist/vue.esm-bundler.js'; // eslint-disable-line import/first
import options from './setup/options';
import plugins from './setup/plugins';

const vueOptions = process.env.NODE_ENV !== 'production'
  ? Object.assign(options, require('./setup/styleguide.options').options) // eslint-disable-line global-require
  : options;

const vuePlugins = process.env.NODE_ENV !== 'production'
  ? [...plugins, ...require('./setup/styleguide.options').plugins] // eslint-disable-line global-require
  : plugins;

const app = createApp(vueOptions);

vuePlugins.forEach(([plugin, pluginOptions]) => {
  app.use(plugin, pluginOptions);
});

app.mount('#app');
