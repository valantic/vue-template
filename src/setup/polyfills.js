import smoothscroll from 'smoothscroll-polyfill';
import cssVars from 'css-vars-ponyfill';

/**
 * Polyfills the Element.closest() method, which is not supported by IE11.
 */
function polyfillElementClosest() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector
      || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
      let element = this; /* eslint-disable-line consistent-this */

      if (!document.documentElement.contains(element)) {
        return null;
      }

      do {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentElement || element.parentNode;
      } while (element !== null && element.nodeType === 1);

      return null;
    };
  }
}

polyfillElementClosest();

smoothscroll.polyfill();

/*
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});
