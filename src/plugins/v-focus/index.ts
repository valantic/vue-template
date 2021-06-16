import './styles/styles.scss';
import { Plugin } from 'vue';

const directives = require.context('./directives/', true, /\.(ts)$/i);

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
 *   ></div>
 * </div>
 * <aside v-focus-mask></aside>
 *
 * - There can be multiple, separate v-focus-item which get focus separately or at the same time.
 * - All v-focus-masks will react to all v-focus-item. It's not possible to create "groups" of items and masks.
 */
const plugin: Plugin = {
  install(app) {
    // Add directives to Vue.
    directives
      .keys()
      .forEach(key => app.directive(directives(key).default.name, directives(key).default));
  },
};

export default plugin;
