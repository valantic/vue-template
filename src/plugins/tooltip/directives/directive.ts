import { DirectiveBinding } from 'vue';
import { createPopper, Placement, Instance } from '@popperjs/core';
import '../styles/styles.scss';

import {
  CLASS_TOOLTIP,
  CLASS_ANCHOR,
  CLASS_TOOLTIP_WRAPPER,
  CLASS_TOOLTIP_WRAPPER_ACTIVE,
  CLASS_TOOLTIP_WRAPPER_VISIBLE,
  DEBOUNCE_CLOSE,
  DEFAULT_POPPER_OPTIONS,
} from '@/plugins/tooltip/shared';

const storageKey = Symbol('Tooltip directive instance');

type TTooltipEvent = {
  [key: string]: EventListener;
}

interface ITooltipElement extends HTMLElement {
  [storageKey]: {
    isHidden: boolean;
    popper: Instance;
    events: TTooltipEvent[];
  }
}

/**
 * Creates a tooltip element and attaches it to the DOM.
 */
function createTooltipElement(content: string): HTMLElement {
  const tooltipWrapper = document.createElement('div');
  const tooltip = document.createElement('div');

  tooltip.innerText = content;
  tooltip.classList.add(CLASS_TOOLTIP);

  tooltipWrapper.classList.add(CLASS_TOOLTIP_WRAPPER);
  tooltipWrapper.appendChild(tooltip);

  document.body.appendChild(tooltipWrapper);

  return tooltipWrapper;
}

/**
 * Bind the given array of event definitions tho the given element.
 */
function bindEvents(element: HTMLElement, events: TTooltipEvent[], bind = true): void {
  events.forEach(event => Object.entries(event).forEach(([type, callback]) => {
    if (bind) {
      element.addEventListener(type, callback);
    } else {
      element.removeEventListener(type, callback);
    }
  }));
}

/**
 * Will create a tooltip for the bound element.
 *
 * v-tooltip[:<tooltipPosition>][.<tooltipTrigger>]="<content>"
 *
 * tooltipPosition: 'top[-start|end]', 'right[-start|end]', 'bottom[-start|end]', 'left[-start|end]', 'hidden'
 * tooltipTrigger: 'mouseover'
 */
export default {
  name: 'tooltip',

  beforeMount(el: ITooltipElement, binding: DirectiveBinding): void {
    const isHidden = binding.arg === 'hidden';
    const placement = isHidden ? 'bottom' : binding.arg as Placement;
    const content = binding.value;
    const modifiers = Object.keys(binding.modifiers || {});
    const triggers = modifiers.length ? modifiers : ['mouseenter'];
    const tooltip = createTooltipElement(content);
    let hideDebounce: ReturnType<typeof setTimeout> | null = null;

    const popper = createPopper(el, tooltip, {
      ...DEFAULT_POPPER_OPTIONS,
      placement,
    });

    el.classList.add(CLASS_ANCHOR);

    /**
     * Removes the active class after the tooltips hide transition ended.
     */
    function onCloseTransitionend(): void {
      tooltip?.classList.remove(CLASS_TOOLTIP_WRAPPER_ACTIVE);
    }

    /**
     * Shows the tooltip.
     */
    function show(): void {
      if (el[storageKey].isHidden) {
        return;
      }

      if (hideDebounce) {
        clearTimeout(hideDebounce);
      }

      tooltip.removeEventListener('transitionend', onCloseTransitionend);
      tooltip.classList.add(CLASS_TOOLTIP_WRAPPER_ACTIVE);

      popper.update().then(() => { // Makes sure the position matches the current toggle size.
        setTimeout(() => {
          tooltip.classList.add(CLASS_TOOLTIP_WRAPPER_VISIBLE);
        });
      });
    }

    /**
     * Hides the tooltip.
     */
    function hide(): void {
      if (hideDebounce) {
        clearTimeout(hideDebounce);
      }

      hideDebounce = setTimeout(() => {
        tooltip.addEventListener('transitionend', onCloseTransitionend, { once: true });

        tooltip.classList.remove(CLASS_TOOLTIP_WRAPPER_VISIBLE);
      }, DEBOUNCE_CLOSE);
    }

    const events = triggers.map((trigger): TTooltipEvent => {
      switch (trigger) {
        default: // mouseover
          return {
            mouseenter: show,
            mouseleave: hide,
          };
      }
    });

    tooltip.addEventListener('mouseenter', () => {
      if (hideDebounce) {
        clearTimeout(hideDebounce);
      }
    });
    tooltip.addEventListener('mouseleave', hide);

    bindEvents(el, events, !isHidden);

    el[storageKey] = {
      popper,
      events,
      isHidden,
    };
  },

  updated(el: ITooltipElement, binding: DirectiveBinding):void {
    const instance = el[storageKey];

    instance.isHidden = binding.arg === 'hidden';

    bindEvents(el, instance.events, !instance.isHidden);
  },

  beforeUnmount(el: ITooltipElement): void {
    const instance = el[storageKey];

    bindEvents(el, instance.events, false);

    el.classList.remove(CLASS_ANCHOR);
    instance.popper.destroy();
  },
};
