// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
// NOTE: this is not working for styleguidist. There you need to add style imports to the required configuration
import './setup/_scss.scss';

import { createApp } from 'vue'; // eslint-disable-line import/first
import options from './setup/options';
import directives from './setup/directives';
import components from './setup/components';

import './setup/plugins';

let vueOptions = options;

// Merge development configuration
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  vueOptions = Object.assign(vueOptions, require('./setup/styleguide.options').default); // Note: will overwrite duplicates
}

const app = createApp(vueOptions);

app.use(directives);
app.use(components);

app.mount('#app');
