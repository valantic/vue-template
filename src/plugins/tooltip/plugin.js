import component from './component';
import directive from './directive';

/**
 * Installs the tooltip directive and component for the given instance.
 */
export default {
  install(Vue) {
    Vue.component(component.name, component);
    Vue.directive(directive.name, directive);
  },
};
