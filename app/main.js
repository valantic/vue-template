import Vue from 'vue';
import plugins from './setup/plugins';
import options from './setup/options';
import devOptions from './setup/options.dev'; // Webpack will ignore imports which are not used
import components from './setup/components';

let vueOptions = options;

Vue.config.productionTip = false;

Vue.use(components);
Vue.use(plugins);

if (!WP_PRODUCTION || WP_STYLEGUIDE) {
  vueOptions = Object.assign(vueOptions, devOptions); // Note: will overwrite duplicates

  // eslint-disable-next-line global-require
  // require('./setup/mock').default(plugins.vueAxios.axios, developmentOptions);
}

// eslint-disable-next-line no-new
window.vm = new Vue(vueOptions);
