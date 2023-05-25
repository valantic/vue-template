import { IDelimiters } from '@/plugins/vue-bem-cn/src/globals';
import { isString, isNumber } from '../utils';

interface IModifiers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface IEntities {
  block: string;
  el?: string;
  mods?: IModifiers;
  mixin?: string;
}

/**
 * Create String from BEM entitys.
 */
export default function bemNames(entities: IEntities, delimiters: IDelimiters): string {
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
