import { DirectiveBinding } from 'vue';

const outsideClickEventConfig = { passive: true, capture: true };

const storageKey = Symbol('Outside click directive instance');

type TOutsideClickHandlerFunction = (event: Event) => void;

interface IOutsideClickValue {
  excludeIds: string[];
  excludeDOM: HTMLElement[];
  handler: TOutsideClickHandlerFunction;
}

interface IOutsideClickDirectiveBinding extends DirectiveBinding {
  value: TOutsideClickHandlerFunction | IOutsideClickValue;
}

interface IOutsideClickElement extends HTMLElement {
  [storageKey]: TOutsideClickHandlerFunction;
}

/**
 * Directive to handle an outside click for a specific DOM element.
 *
 * Examples:
 * <div v-oustide-click="handler"></div>
 * <div v-outside-click="{
 *   excludeIds: [],
 *   excludeDOM: [],
 *   handler: () => {},
 * }"></div>
 */
export default {
  name: 'outside-click',

  beforeMount(el: IOutsideClickElement, binding: IOutsideClickDirectiveBinding) {
    const handler: TOutsideClickHandlerFunction = typeof binding.value === 'function' ? binding.value : binding.value?.handler;

    if (!handler) {
      throw new Error('No event handler defined for v-outside-click.');
    }
    let userIsScrolling = false;

    // Click / Touchstart handler.
    el[storageKey] = (event) => {
      const eventTarget: Node = event.target as Node;

      // These conditions are needed to detect scrolling on touch devices.
      if (event.type === 'scroll') {
        userIsScrolling = true;

        return;
      }

      if (event.type === 'touchend' && userIsScrolling) {
        userIsScrolling = false;

        return;
      }

      // We check to see if the clicked element is not the dialog element and not excluded.
      if (el !== event.target && !el.contains(eventTarget) && handler) {
        if (typeof binding.value === 'object') {
          const {
            excludeIds = [],
            excludeDOM = [],
          } = binding.value;

          const clickedOnExcludedId = excludeIds.some((id) => {
            const element = document.querySelector(id);

            return element && element.contains(eventTarget);
          });
          const clickOnExcludedDomElement = excludeDOM.some(element => element.contains(eventTarget));

          if (clickedOnExcludedId || clickOnExcludedDomElement) {
            return;
          }
        }

        handler(event);
      }
    };

    document.addEventListener('click', el[storageKey], outsideClickEventConfig);
    document.addEventListener('touchend', el[storageKey], outsideClickEventConfig);
    document.addEventListener('scroll', el[storageKey], outsideClickEventConfig);
  },

  beforeUnmount(el: IOutsideClickElement) {
    document.removeEventListener('click', el[storageKey], outsideClickEventConfig);
    document.removeEventListener('touchend', el[storageKey], outsideClickEventConfig);
    document.removeEventListener('scroll', el[storageKey], outsideClickEventConfig);
  },
};
