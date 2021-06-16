import { DirectiveBinding } from '@vue/runtime-core';
import state from '../state';

/**
 * Sets or removes a class depending on the current focus state.
 *
 * @param {Element} el - The DOM element which carries the directive.
 * @param {Object} binding - Data given to the directive.
 * @param {Boolean} binding.value - The desired state of the focus.
 */
function update(el: HTMLElement, binding: DirectiveBinding) {
  if (binding.value) {
    el.classList.add('focus-item');
  } else {
    el.classList.remove('focus-item');
  }

  state.enabled = !!binding.value;
}

/**
 * A directive which adds specific styles to an element to highlight it in the DOM.
 */
export default {
  name: 'focus-item',

  bind: update,

  update,

  unbind() {
    state.enabled = false;
  },
};
