export default {
  install(Vue) {
    // Vue.directive(directive.name, directive);

    if (process.env.NODE_ENV !== 'production') {
      const isObserved = require('@/directives/dev.is-observed'); // eslint-disable-line global-require

      Vue.directive(isObserved.default.name, isObserved.default);
    }
  }
};
