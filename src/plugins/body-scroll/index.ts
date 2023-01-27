import { Plugin } from 'vue';

import './style.scss';

import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

export interface IBodyscroll {
  enable: (target: HTMLElement | Element) => void;
  disable: (target: HTMLElement | Element) => void;
}

const plugin: Plugin = {
  install(app) {
    let resizeObserver: ResizeObserver | null = null;
    let updateTimeout: ReturnType<typeof setTimeout> | null = null;
    let scrollbarWidth = 0;

    /**
     * Updates the scrollbar width.
     */
    function updateScrollbarWidth(): void {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }

      updateTimeout = setTimeout(() => {
        scrollbarWidth = window.innerWidth - document.body.clientWidth; // Used document.body to handle cases with content overflow.

        document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      }, 100);
    }

    /**
     * Adds resize observer.
     */
    function addResizeObserver(): void {
      resizeObserver = new ResizeObserver(updateScrollbarWidth);
      resizeObserver.observe(window.document.body);

      updateScrollbarWidth();
    }

    addResizeObserver();

    app.config.globalProperties.$bodyscroll = {
      /**
       * Enables the scrolling on the body.
       */
      enable(target: HTMLElement | Element): void {
        enableBodyScroll(target);
      },

      /**
       * Disabled the scrolling on the body.
       */
      disable(target: HTMLElement | Element) {
        disableBodyScroll(target);
      },
    };
  },
};

export default plugin;
