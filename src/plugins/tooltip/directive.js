import { createPopper } from '@popperjs/core';
import './style.scss';
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

/**
 * Creates a tooltip element and attaches it to the DOM.
 *
 * @param {String} content - The content for the tooltip.
 *
 * @returns {HTMLDivElement}
 */
function createTooltipElement(content) {
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
 *
 * @param {Element} element - A DOM element.
 * @param {Array.<Object>} events - An array of event definitions: `{ eventType: eventCallback }`
 * @param {Boolean} [bind = true] - Determines if the events should be bound or removed.
 */
function bindEvents(element, events, bind = true) {
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

  bind(el, binding) {
    const isHidden = binding.arg === 'hidden';
    const placement = isHidden ? 'bottom' : binding.arg;
    const content = binding.value;
    const modifiers = Object.keys(binding.modifiers || {});
    const triggers = modifiers.length ? modifiers : ['mouseenter'];
    const tooltip = createTooltipElement(content);
    let hideDebounce;

    const popper = createPopper(el, tooltip, {
      ...DEFAULT_POPPER_OPTIONS,
      placement,
    });

    el.classList.add(CLASS_ANCHOR);

    /**
     * Removes the active class after the tooltips hide transition ended.
     */
    function onCloseTransitionend() {
      tooltip?.classList.remove(CLASS_TOOLTIP_WRAPPER_ACTIVE);
    }

    /**
     * Shows the tooltip.
     */
    function show() {
      if (el[storageKey].isHidden) {
        return;
      }

      clearTimeout(hideDebounce);

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
     *
     * @param {Boolean} [debounce = true] - Defines if the closing should be debounced or instantly.
     */
    function hide(debounce = true) {
      clearTimeout(hideDebounce);

      hideDebounce = setTimeout(() => {
        tooltip.addEventListener('transitionend', onCloseTransitionend, { once: true });

        tooltip.classList.remove(CLASS_TOOLTIP_WRAPPER_VISIBLE);
      }, debounce ? DEBOUNCE_CLOSE : 0);
    }

    const events = triggers.map((trigger) => {
      switch (trigger) {
        default: // mouseover
          return {
            mouseenter: show,
            mouseleave: hide,
          };
      }
    });

    tooltip.addEventListener('mouseenter', () => clearTimeout(hideDebounce));
    tooltip.addEventListener('mouseleave', hide);

    bindEvents(el, events, !isHidden);

    el[storageKey] = {
      popper,
      events,
      isHidden,
    };
  },

  update(el, binding) {
    const instance = el[storageKey];

    instance.isHidden = binding.arg === 'hidden';

    bindEvents(el, instance.events, !instance.isHidden);
  },

  unbind(el) {
    const instance = el[storageKey];

    bindEvents(el, instance.events, false);

    el.classList.remove(CLASS_ANCHOR);
    instance.popper.destroy();
  },
};
