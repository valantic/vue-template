import { DirectiveBinding } from '@vue/runtime-core';

const outsideClickEventConfig = { passive: true, capture: true };

interface ICustomElement extends HTMLElement {
  outsideClickHandler: (event: Event) => void;
}

/**
 * Directive to handle an outside click for a specific DOM element.
 *
 * Examples:
 *
 * <div v-outside-click="{
 *   exclude: [],
 *   excludeIds: [],
 *   handler: () => {},
 * }"></div>
 */
export default {
  name: 'outside-click',

  /**
   * Binding method of the directive.
   *
   * @param {Object} el - The bound element.
   * @param {Object} binding - The binding payload object.
   * @param {Object} binding.value - The payload values.
   * @param {Function} binding.value.handler - The outside click handler function.
   * @param {Array.<String>} binding.value.exclude - The excluded $ref DOM elements.
   * @param {Array.<String>} binding.value.excludeIds - The excluded global DOM id's.
   */
  bind(el: ICustomElement, binding: DirectiveBinding) {
    let userIsScrolling = false;

    // Click / Touchstart handler.
    el.outsideClickHandler = (event: Event) => {
      // These conditions are needed to detect scrolling on touch devices.
      if (event.type === 'scroll') {
        userIsScrolling = true;

        return;
      }

      if (event.type === 'touchend' && userIsScrolling) {
        userIsScrolling = false;

        return;
      }

      const { handler, exclude = [], excludeIds = [] } = binding.value;

      // We check to see if the clicked element is not the dialog element and not excluded.
      if (!el.contains(event.target as Node) && handler) {
        const clickedOnExcludedElement = !!exclude.find((refName: string) => {
          const excludedElement: any = binding.instance?.$refs[refName];

          if (Array.isArray(excludedElement)) {
            return excludedElement.some(component => component.$el.contains(event.target));
          }

          return excludedElement ? excludedElement.contains(event.target) : false;
        });

        const clickedOnExcludedId = excludeIds.some((id: string) => {
          const element = document.querySelector(id);

          return element && element.contains(event.target as Node);
        });

        if (!clickedOnExcludedElement && !clickedOnExcludedId) {
          handler();
        }
      }
    };

    document.addEventListener('click', el.outsideClickHandler, outsideClickEventConfig);
    document.addEventListener('touchend', el.outsideClickHandler, outsideClickEventConfig);
    document.addEventListener('scroll', el.outsideClickHandler, outsideClickEventConfig);
  },

  unbind(el: ICustomElement) {
    document.removeEventListener('click', el.outsideClickHandler, outsideClickEventConfig);
    document.removeEventListener('touchend', el.outsideClickHandler, outsideClickEventConfig);
    document.removeEventListener('scroll', el.outsideClickHandler, outsideClickEventConfig);
  }
};
