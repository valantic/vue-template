import { DefineComponent, DirectiveBinding } from 'vue';

const outsideClickEventConfig = { passive: true, capture: true };

const storageKey = Symbol('Outside click directive instance');

type TOutsideClickHandlerFunction = (event: Event) => void;

interface IOutsideClickValue {
  excludeRefs: string[];
  excludeIds: string[];
  excludeElements: HTMLElement[];
  handler: TOutsideClickHandlerFunction;
}

interface IOutsideClickDirectiveBinding extends DirectiveBinding {
  value: TOutsideClickHandlerFunction | IOutsideClickValue;
}

interface IOutsideClickElement extends HTMLElement {
  [storageKey]: TOutsideClickHandlerFunction;
}

function isClickOnExcludedRefElement(excludeRefs: string[], eventTarget: Node, binding: IOutsideClickDirectiveBinding): boolean {
  return !!excludeRefs.find((refName) => {
    const excludedElement = binding.instance?.$refs[refName];

    if (Array.isArray(excludedElement)) {
      return excludedElement.some((node: InstanceType<DefineComponent> | HTMLElement) => {
        if (node instanceof HTMLElement) {
          return node.contains(eventTarget);
        }

        return node.$el.constructor(eventTarget);
      });
    }

    if (excludedElement instanceof HTMLElement) {
      return excludedElement.contains(eventTarget);
    }

    return false;
  });
}

function isClickOnExcludedIdElement(excludeIds: string[], eventTarget: Node): boolean {
  return excludeIds.some((id) => {
    const element = document.querySelector(id);

    return element && element.contains(eventTarget);
  });
}

function isClickOnExcludedElement(excludeElements: Node[], eventTarget: Node): boolean {
  return excludeElements.some(element => element.contains(eventTarget));
}

/**
 * Directive to handle an outside click for a specific DOM element and/or given excludes.
 *
 * Examples:
 * <div v-oustide-click="TOutsideClickHandlerFunction"></div>
 * <div v-outside-click="IOutsideClickValue"></div>
 */
export default {
  name: 'outside-click',

  directive: {
    beforeMount(el: IOutsideClickElement, binding: IOutsideClickDirectiveBinding): void {
      const handler: TOutsideClickHandlerFunction = typeof binding.value === 'function' ? binding.value : binding.value?.handler;

      if (!handler) {
        throw new Error('No event handler defined for v-outside-click.');
      }
      let userIsScrolling = false;

      // Click / Touchstart handler.
      el[storageKey] = (event):void => {
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
        if (el !== event.target && !el.contains(eventTarget)) {
          if (typeof binding.value === 'object') {
            const {
              excludeRefs = [],
              excludeIds = [],
              excludeElements = [],
            } = binding.value;

            if (isClickOnExcludedRefElement(excludeRefs, eventTarget, binding)
              || isClickOnExcludedIdElement(excludeIds, eventTarget)
              || isClickOnExcludedElement(excludeElements, eventTarget)
            ) {
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

    beforeUnmount(el: IOutsideClickElement): void {
      document.removeEventListener('click', el[storageKey], outsideClickEventConfig);
      document.removeEventListener('touchend', el[storageKey], outsideClickEventConfig);
      document.removeEventListener('scroll', el[storageKey], outsideClickEventConfig);
    },
  },
};
