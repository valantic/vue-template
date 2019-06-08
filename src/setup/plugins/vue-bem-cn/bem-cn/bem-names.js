import { isString, isNumber } from '../utils';

/**
 * Create String from BEM entities.
 *
 * @param {Object} entities - BEM entitys.
 * @param {String} entities.block - Block.
 * @param {String} [entities.el] - Element.
 * @param {Object<string>} [entities.mods] - Modifiers.
 * @param {String} [entities.mixin] - Mixin.
 * @param {Object<String>} delimiters - Delimiters for BEM entities.
 *
 * @returns {String}
 */
export default function bemNames(entities, delimiters) {
  const space = ' ';
  let resultString = entities.block;

  if (entities.el) {
    resultString += delimiters.el + entities.el;
  }

  if (entities.mods) {
    resultString += Object.keys(entities.mods).reduce((prev, name) => {
      const val = entities.mods[name];

      /* eslint-disable no-param-reassign */
      if (val === true) {
        prev += space + resultString + delimiters.mod + name;
      } else if (isString(val) || isNumber(val)) {
        prev += space + resultString + delimiters.mod + name + delimiters.modVal + val;
      }
      /* eslint-enable no-param-reassign */

      return prev;
    }, '');
  }

  return resultString + (entities.mixin ? space + entities.mixin : '');
}
