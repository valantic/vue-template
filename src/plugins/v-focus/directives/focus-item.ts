import { DirectiveBinding } from 'vue';
import state from '../state';

const bemBlock = 'v-focus-item';

/**
 * Sets or removes a class depending on the current focus state.
 */
function updated(el: HTMLElement, binding: DirectiveBinding): void {
  const focusModifier = `${bemBlock}--focus`;
  const enabled = !!binding.value;

  el.classList.toggle(focusModifier, enabled);

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
