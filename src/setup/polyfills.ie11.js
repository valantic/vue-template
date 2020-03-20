/**
 * This file is used as a separate entry point in webpack
 *
 * Makes sure you use the 'nomodule' attribute on the script tag, when importing it into HTML, to prevent the content to be
 * loaded by modern browsers.
 */
import 'picturefill';
import cssVars from 'css-vars-ponyfill';

/*
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});
