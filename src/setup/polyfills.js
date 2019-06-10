// ES2015+ is polyfilled with @babel/polyfills in webpack configuration.
import 'picturefill';
import 'lazysizes';
import cssVars from 'css-vars-ponyfill';
import './lib/ls.attrchange'; // Lazy sizes attribute change observer

/*
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});
