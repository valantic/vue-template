/**
 * Function set's a "no-scroll" modifier class to the body which provides body from scrolling.
 *
 * @param {Boolean} hasScroll - true => scroll enabled / false = scroll disabled
 * @param {String} [axis='x-y'] - Creates an axis modifier for the scroll class.
 * @param {Boolean} [isFixed=true] - Controls if 'position:fixed' shall be added.
 */
export default function bodyScroll(hasScroll, axis = 'x-y', isFixed = true) {
  const CLASS_SCROLL = 'no-scroll';
  const { body } = document;
  const axisModifier = axis ? `--${axis}` : '';
  const positionModifier = isFixed ? '--position-fixed' : '';

  if (hasScroll) {
    body.classList.remove(CLASS_SCROLL); // IE11 does not support multiple classes for remove().
    body.classList.remove(CLASS_SCROLL + axisModifier);
    body.classList.remove(CLASS_SCROLL + positionModifier);
  } else {
    body.classList.add(CLASS_SCROLL); // IE11 does not support multiple classes for remove().
    body.classList.add(CLASS_SCROLL + axisModifier);
    body.classList.add(CLASS_SCROLL + positionModifier);
  }
}
