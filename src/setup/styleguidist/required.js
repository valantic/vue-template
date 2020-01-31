import '@/setup/polyfills';
import Vue from 'vue';
import components from '@/setup/components';
import directives from '@/setup/directives';
import statusLabel from '@/plugins/styleguide.status-label';

// Global styleguide components
import status from '@/styleguide/components/s-status';

// Polyfills and self executing
import '@/setup/styleguide.options';
import '@/setup/plugins';
import '@/setup/vuetify'; // Only import if required by project!

// Global styles
import '@/setup/_scss.scss';
import '@/components/c-form.scss';
import './style.scss';

Vue.use(directives);
Vue.use(components);
Vue.use(statusLabel);

Vue.component(status.name, status);
