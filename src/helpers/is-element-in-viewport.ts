type ViewportSpacing = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const spacingFallback = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 0,
};

/**
 * Calculates if the given DOM element is visible in the viewport.
 */
export default function isElementInViewport(
  element: HTMLElement,
  viewportSpacing: ViewportSpacing = spacingFallback
): boolean {
  const elementRect = element.getBoundingClientRect();

  return (
    elementRect.top >= (viewportSpacing.top || 0) &&
    elementRect.left >= (viewportSpacing.left || 0) &&
    elementRect.bottom <= window.innerHeight + (-viewportSpacing.bottom || 0) &&
    elementRect.right <= window.innerWidth + (-viewportSpacing.right || 0)
  );
}
