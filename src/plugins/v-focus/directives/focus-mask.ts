import state from '../state';

const bemBlock = 'focus-mask';

/**
 * Adds or removes a focus class to the given element based on the current focus state.
 */
function update(el: HTMLElement): void {
  const visibleModifier = `${bemBlock}--visible`;
  const variantModifier = state.variant && `${bemBlock}--variant-${state.variant}`;
  const hidingModifier = `${bemBlock}--hiding`;

  if (state.enabled) { // This will also make the directive reactive to the observable.
    el.classList.add(visibleModifier);

    if (variantModifier) {
      el.classList.add(variantModifier);
    }
  } else {
    const removeClasses = (): void => {
      el.classList.remove(visibleModifier);
      el.classList.remove(hidingModifier);

      if (variantModifier) {
        el.classList.remove(variantModifier);
      }

      el.removeEventListener('transitionend', removeClasses);
    };

    el.addEventListener('transitionend', removeClasses);

    el.classList.add(hidingModifier);
  }
}

/**
 * A directive to show an overlay inside the bound element.
 */
export default {
  name: 'focus-mask',

  mounted(el: HTMLElement): void {
    el.classList.add(bemBlock);

    if (state.enabled) {
      update(el);
    }
  },

  updated: update,
};
