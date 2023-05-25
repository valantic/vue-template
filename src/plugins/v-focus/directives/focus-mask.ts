import state from '../state';

/**
 * Adds or removes a focus class to the given element based on the current focus state.
 */
function update(el: HTMLElement): void {
  if (state.enabled) { // This will also make the directive reactive to the observable.
    el.classList.add('focus-mask');
  } else {
    el.classList.remove('focus-mask');
  }
}

/**
 * A directive to show an overlay inside the bound element.
 */
export default {
  name: 'focus-mask',

  beforeMount: update,
  updated: update,
};
