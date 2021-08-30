// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
// NOTE: this is not working for styleguidist. There you need to add style imports to the required configuration
import './setup/_scss.scss';

import { createApp } from 'vue';
import store from '@/store';
import options from './setup/options';
import directives from './setup/directives';
import components from './setup/components';

import './setup/plugins';
import getUrlParameter from './helpers/get-url-parameter';

Vue.config.devtools = process.env.NODE_ENV !== 'production' || process.env.HAS_WATCHER;
Vue.config.performance = process.env.NODE_ENV !== 'production'; // NOTE: currently failing with watcher.
Vue.config.productionTip = false;

let vueOptions = options;

Vue.use(directives);
Vue.use(components);

// Merge development configuration
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  vueOptions = Object.assign(vueOptions, require('./setup/styleguide.options').default); // Note: will overwrite duplicates
}

const vm = new Vue(vueOptions);

vm.$mount('#app');

app.use(store.original);

app.mount('#app');
