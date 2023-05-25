import scrollbarWidth from '@/helpers/scrollbar-width';

/**
 * Sets a max-width to the header and l-default wrapper so the hidden scrollbar will not cause content resizing.
 */
export default function avoidContentResizing(state = true): void {
  const scrollBar = scrollbarWidth();
  const lDefault = document.getElementsByClassName('l-default')[0] as HTMLElement;
  const cHeader = document.getElementsByClassName('c-header')[0] as HTMLElement;
  const maxWidth = scrollBar > 0 && state ? `${window.innerWidth - scrollBar}px` : '';

  if (lDefault) {
    lDefault.style.maxWidth = maxWidth;
  }

  if (cHeader) {
    cHeader.style.maxWidth = maxWidth;
  }
}
