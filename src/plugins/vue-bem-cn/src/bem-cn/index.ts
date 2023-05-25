import { IDelimiters } from '@/plugins/vue-bem-cn/src/globals';
import { isString, isPObject, hyphenate } from '../utils';
import bemNames from './bem-names';

interface IOptions {
  delimiters: IDelimiters;
  hyphenate: boolean;
}

/**
 * Returns a BEM name creator method with the given options applied.
 */
export default function bemCn(block: string, options: IOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function entities(elem: any, mods?: string | object, mix?: string): string {
    const resultObj = {
      block,
      el: '',
      mods: {},
      mixin: '',
    };

    if (!elem && !mods && !mix) {
      return block;
    }

    if (mods && isPObject(mods)) {
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
