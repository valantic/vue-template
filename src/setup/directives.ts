import { Plugin } from 'vue';
import { NamedDirective } from '@/types/named-directive';

const directives = import.meta.glob('../directives/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  NamedDirective
>;

const plugin: Plugin = {
  install(app) {
    Object.values(directives).forEach((module) => {
      app.directive(module.name, module);
    });
  },
};

export default plugin;
