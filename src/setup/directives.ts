import { Plugin } from 'vue';

const plugin: Plugin = {
  install(app) {
    // Vue.directive(directive.name, directive);

    if (process.env.NODE_ENV !== 'production') {
      const isObserved = require('@/directives/dev.is-observed'); // eslint-disable-line global-require

      app.directive(isObserved.default.name, isObserved.default);
    }
  }
};

export default plugin;
