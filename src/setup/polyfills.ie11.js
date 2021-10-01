/**
 * This file is used as a separate entry point in webpack
 *
 * Makes sure you use the 'nomodule' attribute on the script tag, when importing it into HTML,
 * to prevent the content to be loaded by modern browsers.
 * Be aware, that some Browser might still need some of the polyfills you define
 * here, even if they support modules (e.g. early Edge versions who did not support custom elements).
 * Makes sure you test extensively.
 */
import 'picturefill';
import svg4everybody from 'svg4everybody';
import cssVars from 'css-vars-ponyfill';

/*
 * Polyfill for css vars on IE11 https://github.com/jhildenbiddle/css-vars-ponyfill
 */
cssVars({
  silent: process.env.NODE_ENV === 'production'
});

svg4everybody();
