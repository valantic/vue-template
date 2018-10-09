const requireFunction = require.context('../directives/', true, /\.(js|vue)$/i);

export default {
  install(Vue) {
    // TODO: Write jest test for directive.

    requireFunction.keys().map((key) => {
      const name = key.match(/\w+/)[0];

      Vue.directive(name, requireFunction(key).default);
    });
  },
};
