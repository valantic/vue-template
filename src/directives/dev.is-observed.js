/**
 * Tests if the given directive value is an observed Object or Array and makes a console log of the result.
 *
 * @param {Element} element - The element to which the directive is attached.
 * @param {Object} binding - The binding data for the current directive binding.
 * @param {*} binding.value - The attribute value.
 */
function checkObservable(element, binding) {
  let hasObservable = false;

  if (binding?.value?.__ob__) { // eslint-disable-line no-underscore-dangle
    hasObservable = true;
  }

  console.info(`The value on "${element.classList.value}" is ${hasObservable ? '' : 'not'} an observable.`, element); // eslint-disable-line no-console
}

export default {
  name: 'is-observed',
  bind: checkObservable,
  update: checkObservable,
};
