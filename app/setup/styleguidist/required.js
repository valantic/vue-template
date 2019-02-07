import Vue from 'vue';
import components from '@/setup/components';
import directives from '@/setup/directives';
import statusLabel from '@/setup/plugins/styleguide.status-label';

// Global styleguide components
import status from '@/styleguide/components/s-status';

// Polyfills and self executing
import '@/setup/styleguide.options';
import '@/setup/plugins';

Vue.use(directives);
Vue.use(components);
Vue.use(statusLabel);

Vue.component(status.name, status);
