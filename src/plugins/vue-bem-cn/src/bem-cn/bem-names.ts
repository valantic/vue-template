import { Delimiters } from '@/plugins/vue-bem-cn/src/globals';
import { isString, isNumber } from '../utils';

interface Modifiers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Entities {
  block: string;
  el?: string;
  mods?: Modifiers;
  mixin?: string;
}

/**
 * Create String from BEM entitys.
 */
export default function bemNames(entities: Entities, delimiters: Delimiters): string {
  let resultString = entities.block;

  if (entities.el) {
    resultString += delimiters.el + entities.el;
  }

  if (entities.mods) {
    resultString += Object.keys(entities.mods).reduce((prev, name) => {
      const val = entities.mods ? entities.mods[name] : '';

      /* eslint-disable no-param-reassign */
      if (val === true) {
        prev += ` ${resultString}${delimiters.mod}${name}`;
      } else if (isString(val) || isNumber(val)) {
        prev += ` ${resultString}${delimiters.mod}${name}${delimiters.modVal}${val}`;
      }
      /* eslint-enable no-param-reassign */

      return prev;
    }, '');
  }

  return resultString + (entities.mixin ? ` ${entities.mixin}` : '');
}
