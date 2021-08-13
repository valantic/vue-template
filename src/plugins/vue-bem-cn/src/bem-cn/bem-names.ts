import { IDelimiters } from '@/plugins/vue-bem-cn/src/globals';
import { isString, isNumber } from '../utils';

interface IModifiers {
  [key: string]: any
}

interface IEntities {
  block: string;
  el: string;
  mods: IModifiers;
  mixin: string;
}

/**
 * Create String from BEM entitys.
 *
 * @param {Object} entities - A collection of BEM entities.
 * @param {String} entities.block - Block name.
 * @param {String} [entities.el] - Element.
 * @param {Object<string>} [entities.mods] - Modifiers.
 * @param {String} [entities.mixin] - Mixin.
 * @param {Object.<String>} delimiters - Delimiters for BEM entities.
 *
 * @returns {String}
 */
export default function bemNames(entities: IEntities, delimiters: IDelimiters) {
  let resultString = entities.block;

  if (entities.el) {
    resultString += delimiters.el + entities.el;
  }

  if (entities.mods) {
    resultString += Object.keys(entities.mods).reduce((prev, name) => {
      const val = entities.mods[name];

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
