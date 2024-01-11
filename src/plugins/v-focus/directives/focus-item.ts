import { DirectiveBinding } from 'vue';
import state from '../state';

// TODO: Hiding the mask causes instant background removal. I'm not sure, how this can be fixed...

/**
 * Sets or removes a class depending on the current focus state.
 */
function updated(el: HTMLElement, binding: DirectiveBinding): void {
  const enabled = !!binding.value;

  if (enabled) {
    el.classList.add('focus-item');
  } else {
    el.classList.remove('focus-item');
  }

  state.variant = binding.arg || undefined;
  state.enabled = enabled;
}

/**
 * A directive which adds specific styles to an element to highlight it in the DOM.
 */
export default {
  name: 'focus-item',

  beforeMount(el: HTMLElement, binding: DirectiveBinding): void {
    if (binding.value) {
      updated(el, binding);
    }
  },

  updated,

  unmounted(): void {
    state.variant = undefined;
    state.enabled = false;
  },
};
