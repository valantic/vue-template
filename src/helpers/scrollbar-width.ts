/**
 * Gets the current scrollbar width.
 *
 * @returns {Number}
 */
export default function scrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}
