import './styles/styles.scss';

const directives = require.context('./directives/', true, /\.(js)$/i);

/**
 * This plugin adds two directives, to apply a "focus" effect to a page/element.
 * On of the directives highlights a given element, while the elements marked with the other directive are covered up.
 *
 * example:
 * <div class="outer-element"
 *      v-focus-mask
 * >
 *   <div class="can-get-focus"
 *        v-focus-item="isEditMode"
 *   >
 * </div>
 * <asside v-focus-mask></asside>
 *
 * - There can be multiple, separate v-focus-item which get focus separately or at the same time.
 * - All v-focus-masks will react to all v-focus-item. It's not possible to create "groups" of items and masks.
 */
export default {
  install(Vue) {
    // Add directives to Vue.
    directives
      .keys()
      .forEach(key => Vue.directive(directives(key).default.name, directives(key).default));
  },
};
