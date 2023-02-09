import {
  Plugin,
} from 'vue';
import directive from './directives/directive';
import component from './c-tooltip.vue';

/**
 * Installs the tooltip directive and component for the given instance.
 */
const plugin: Plugin = {
  install(app) {
    app.directive(directive.name, directive);
    app.component(component.name, component);
  },
};

export default plugin;
