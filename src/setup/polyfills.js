// Basic ES2015+ polyfills
import 'core-js/features/array/';
import 'core-js/features/promise/';
import 'core-js/features/symbol/';
import 'core-js/features/object/';

// Special polyfills
import 'picturefill';
import 'lazysizes';
import cssVars from 'css-vars-ponyfill';

/*
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});
