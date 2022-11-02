import { DirectiveBinding, ComponentPublicInstance } from 'vue';

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
 *
 * Options:
 * - exclude: array of strings with ref names being initialized in the setup method of the component
 * - excludeIds: array of strings with node id's
 * - handler: handler function to execute
 */
export default {
  name: 'outside-click',

  /**
   * Binding method of the directive.
   */
  beforeMount(el: ICustomElement, binding: DirectiveBinding): void {
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
      const eventTarget = event.target as Node;

      if (!el.contains(eventTarget) && handler) {
        const clickedOnExcludedElement = !!exclude.find((refName: string) => {
          const componentInstance = binding.instance as ComponentPublicInstance;
          // @ts-ignore
          const excludedElement: HTMLElement = componentInstance[refName];

          if (Array.isArray(excludedElement)) {
            return excludedElement.some(component => component.$el.contains(eventTarget));
          }

          return excludedElement ? excludedElement.contains(eventTarget) : false;
        });

        const clickedOnExcludedId = excludeIds.some((id: string) => {
          const element = document.querySelector(id);

          return element && element.contains(eventTarget);
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

  unmounted(el: ICustomElement): void {
    document.removeEventListener('click', el.outsideClickHandler, outsideClickEventConfig);
    document.removeEventListener('touchend', el.outsideClickHandler, outsideClickEventConfig);
    document.removeEventListener('scroll', el.outsideClickHandler, outsideClickEventConfig);
  },
};
