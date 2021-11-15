/**
 * Gets the current scrollbar width.
 */
export default function scrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}
