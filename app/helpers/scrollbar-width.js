/**
 * Gets the current scrollbar width.
 *
 * @returns {Number}
 */
export default function scrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
