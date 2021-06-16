interface IViewportSpacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Calculates if the given DOM element is visible in the viewport.
 *
 * @param {Node} element - The DOM element which needs to be tested.
 * @param {Object} viewportSpacing - Allows to define additional inner spacings for the viewport.
 *
 * @returns {Boolean}
 */
export default function isElementInViewport(element: HTMLElement, viewportSpacing: IViewportSpacing = { top: 10, right: 0, bottom: 10, left: 0 }): boolean { // eslint-disable-line object-curly-newline, max-len
  const elementRect = element.getBoundingClientRect();

  return elementRect.top >= (viewportSpacing.top || 0)
    && elementRect.left >= (viewportSpacing.left || 0)
    && elementRect.bottom <= window.innerHeight + (-viewportSpacing.bottom || 0)
    && elementRect.right <= window.innerWidth + (-viewportSpacing.right || 0);
}
