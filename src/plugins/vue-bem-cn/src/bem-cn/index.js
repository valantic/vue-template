import { isString, isPObject, hyphenate } from '../utils';
import bemNames from './bem-names';

/**
 * Returns a BEM name creator method with the given options applied.
 *
 * @param {String} block - The BEM block name.
 * @param {Object} options - Parser options.
 * @param {Object} options.delimiters - An Object of delimiter defintions.
 * @param {Object} [options.hyphenate] - If true, camel case names will be converted to kebab-case.
 *
 * @returns {Function}
 */
export default function bemCn(block, options) {
  return function entities(elem, mods, mix) {
    const resultObj = {
      block,
      el: '',
      mods: {},
      mixin: '',
    };

    if (!elem && !mods && !mix) {
      return block;
    }

    if (isPObject(mods)) {
      resultObj.mods = mods;
    } else if (isString(mods)) {
      resultObj.mixin += mods;
    }

    if (isString(elem)) {
      resultObj.el = elem;
    } else if (isPObject(elem)) {
      resultObj.mods = elem;
    }

    if (isString(mix)) {
      resultObj.mixin += resultObj.mixin ? ` ${mix}` : mix;
    }

    const bemClasses = bemNames(resultObj, options.delimiters);

    return options.hyphenate
      ? hyphenate(bemClasses)
      : bemClasses;
  };
}
