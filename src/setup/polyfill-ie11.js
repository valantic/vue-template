// This file is used as a separate entry point in webpack
import 'picturefill';
import cssVars from 'css-vars-ponyfill';

/*
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});
