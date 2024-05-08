import { Instance, Placement, createPopper } from '@popperjs/core';
import { DirectiveBinding } from 'vue';
import {
  CLASS_ANCHOR,
  CLASS_TOOLTIP,
  CLASS_TOOLTIP_WRAPPER,
  CLASS_TOOLTIP_WRAPPER_ACTIVE,
  CLASS_TOOLTIP_WRAPPER_VISIBLE,
  DEBOUNCE_CLOSE,
  DEFAULT_POPPER_OPTIONS,
} from '@/plugins/tooltip/shared';
import type { NamedDirective } from '@/types/named-directive';
import '../styles/styles.scss';

const storageKey = Symbol('Tooltip directive instance');
const tooltipAnchor = Symbol('The current tooltip anchor');

type TooltipEvent = {
  [key: string]: EventListener;
};

type AnchorElement = HTMLElement & {
  [storageKey]: {
    isHidden: boolean;
    popper: Instance;
    events: TooltipEvent[];
    content: string;
  };
};

type Tooltip = HTMLDivElement & {
  [tooltipAnchor]?: HTMLElement;
};

let tooltip: Tooltip;
let tooltipInner: HTMLDivElement;
let hideDebounceTimeout: ReturnType<typeof setTimeout>;

/**
 * Removes the active class after the tooltips hide transition ended.
 */
function onCloseTransitionend(): void {
  tooltip.classList.remove(CLASS_TOOLTIP_WRAPPER_ACTIVE);
}

/**
 * Hides the tooltip.
 */
function hideTooltip(debounce = true): void {
  if (hideDebounceTimeout) {
    clearTimeout(hideDebounceTimeout);
  }

  hideDebounceTimeout = setTimeout(
    () => {
      tooltip.addEventListener('transitionend', onCloseTransitionend, { once: true });
      tooltip.classList.remove(CLASS_TOOLTIP_WRAPPER_VISIBLE);
      tooltip[tooltipAnchor] = undefined;
    },
    debounce ? DEBOUNCE_CLOSE : 0
  );
}

function setTooltipInnerText(content: string): void {
  tooltipInner.innerText = content;
}

/**
 * Shows the tooltip.
 */
function showTooltip(el: AnchorElement): void {
  if (hideDebounceTimeout) {
    clearTimeout(hideDebounceTimeout);
  }

  setTooltipInnerText(el[storageKey].content || '');
  tooltip.removeEventListener('transitionend', onCloseTransitionend);
  tooltip.classList.add(CLASS_TOOLTIP_WRAPPER_ACTIVE);
  tooltip[tooltipAnchor] = el;

  el[storageKey].popper.update().then(() => {
    // Makes sure the position matches the current toggle size.
    setTimeout(() => {
      tooltip.classList.add(CLASS_TOOLTIP_WRAPPER_VISIBLE);
    });
  });
}

/**
 * Bind the given array of event definitions to the given element.
 */
function bindEvents(element: HTMLElement, events: TooltipEvent[], bind = true): void {
  events.forEach((event) =>
    Object.entries(event).forEach(([type, callback]) => {
      if (bind) {
        element.addEventListener(type, callback);
      } else {
        element.removeEventListener(type, callback);
      }
    })
  );
}

/**
 * Creates a tooltip element and attaches it to the DOM.
 */
function createTooltipElement(): HTMLDivElement {
  tooltip = document.createElement('div');
  tooltipInner = document.createElement('div');

  tooltipInner.classList.add(CLASS_TOOLTIP);

  tooltip.classList.add(CLASS_TOOLTIP_WRAPPER);
  tooltip.appendChild(tooltipInner);

  tooltip.addEventListener('pointerenter', () => {
    if (hideDebounceTimeout) {
      clearTimeout(hideDebounceTimeout);
    }
  });
  tooltip.addEventListener('mouseleave', () => hideTooltip());

  document.body.appendChild(tooltip);

  return tooltip;
}

/**
 * Defines the tooltip placement based on the binding value.
 */
function getTooltipPlacement(binding: DirectiveBinding): Placement | undefined {
  return binding.arg === 'hidden' ? 'bottom' : (binding.arg as Placement);
}

/**
 * Handles global click events and checks if it was an outside click.
 */
function onGlobalClick(event: MouseEvent): void {
  const isOutsideClick = event.target !== tooltip && !tooltip.contains(event.target as Node);
  const isAnyAnchorElement = !!event.target && storageKey in event.target;

  if (isOutsideClick && !isAnyAnchorElement) {
    hideTooltip(false);
  }
}

/**
 * Handles global scroll events.
 */
function onScroll(): void {
  hideTooltip(false);
}

/**
 * Will create a tooltip for the bound element.
 *
 * v-tooltip[:<tooltipPosition>][.<tooltipTrigger>]="<content>"
 *
 * tooltipPosition: 'top[-start|end]', 'right[-start|end]', 'bottom[-start|end]', 'left[-start|end]', 'hidden'
 * tooltipTrigger: 'mouseover'
 */
export default (function (): NamedDirective {
  createTooltipElement();

  window.addEventListener('click', onGlobalClick, { passive: true });

  // Note: this is a workaround, because the tooltip was aligned with a random element on scroll instead of the last active one. Could be improved.
  window.addEventListener('scroll', onScroll, { passive: true });

  return {
    name: 'tooltip',

    beforeMount(el: AnchorElement, binding: DirectiveBinding): void {
      const isHidden = binding.arg === 'hidden';
      const placement = getTooltipPlacement(binding) || 'bottom';
      const content = binding.value;
      const modifiers = Object.keys(binding.modifiers || {});
      const triggers = modifiers.length ? modifiers : ['pointerenter'];

      const popper = createPopper(el, tooltip, {
        ...DEFAULT_POPPER_OPTIONS,
        placement,
      });

      el.classList.add(CLASS_ANCHOR);

      const events = triggers.map((trigger): TooltipEvent => {
        switch (trigger) {
          case 'click':
            return {
              click(event): void {
                if (!el[storageKey].isHidden) {
                  if (
                    tooltip[tooltipAnchor] === event.target &&
                    tooltip.classList.contains(CLASS_TOOLTIP_WRAPPER_VISIBLE)
                  ) {
                    hideTooltip(false);
                  } else {
                    showTooltip(el);
                  }
                }
              },
            };

          default: // mouseover
            return {
              pointerenter(): void {
                if (!el[storageKey].isHidden) {
                  showTooltip(el);
                }
              },
              mouseleave: () => hideTooltip(),
            };
        }
      });

      bindEvents(el, events, !isHidden);

      el[storageKey] = {
        popper,
        events,
        isHidden,
        content,
      };
    },

    updated(el: AnchorElement, binding: DirectiveBinding): void {
      const instance = el[storageKey];
      const placement = getTooltipPlacement(binding) || 'bottom';

      instance.isHidden = binding.arg === 'hidden';

      if (binding.value !== binding.oldValue) {
        el[storageKey].content = binding.value;
      }

      el[storageKey].popper.setOptions({
        placement,
      });

      bindEvents(el, instance.events, !instance.isHidden);
    },

    beforeUnmount(el: AnchorElement): void {
      const instance = el[storageKey];

      bindEvents(el, instance.events, false);

      el.classList.remove(CLASS_ANCHOR);
      instance.popper.destroy();

      window.removeEventListener('click', onGlobalClick);
      window.removeEventListener('scroll', onScroll);
    },
  };
})();
