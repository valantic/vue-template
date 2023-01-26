import Vue from 'vue';
import '@/setup/polyfills.ie11';
import components from '@/setup/ssr-components';
import directives from '@/setup/directives';
import statusLabel from '@/plugins/styleguide.status-label';

// Global styleguide components
import status from '@/styleguide/components/s-status';

// Polyfills and self executing
import '@/setup/styleguide.options';
import '@/setup/plugins';

// Global styles
import '@/setup/_scss.scss';
import '@/components/c-form.scss';
import './style.scss';

Vue.use(directives);
Vue.use(components);
Vue.use(statusLabel);

Vue.component(status.name, status);
