import scrollbarWidth from '@/helpers/scrollbar-width';

/**
 * Sets a max-width to the header and l-default wrapper so the hidden scrollbar will not cause content resizing.
 *
 * @param {Boolean} state [state = false] - Add / Remove the maxWidth property.
 */
export default function avoidContentResizing(state = true) {
  const scrollBar = scrollbarWidth();
  const lDefault = document.getElementsByClassName('l-default')[0];
  const cHeader = document.getElementsByClassName('c-header')[0];
  const maxWidth = scrollBar > 0 && state ? `${window.innerWidth - scrollBar}px` : null;

  if (lDefault) {
    lDefault.style.maxWidth = maxWidth;
  }

  if (cHeader) {
    cHeader.style.maxWidth = maxWidth;
  }
}
