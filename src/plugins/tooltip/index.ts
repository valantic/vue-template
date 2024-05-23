import { Plugin } from 'vue';
import component from './c-tooltip.vue';
import directive from './directives/directive';

/**
 * Installs the tooltip directive and component for the given instance.
 */
const plugin: Plugin = {
  install(app) {
    app.directive(directive.name, directive);
    app.component(component.name || '', component);
  },
};

export default plugin;
