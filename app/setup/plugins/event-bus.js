/**
 * Adds an eventBus instance to Vue itself, which can be used by calling this.$eventBus.
 */
export default {
  install(Vue) {
    Vue.prototype.$eventBus = new Vue();
  }
};
