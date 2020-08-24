import formatPrice from '@/helpers/format-price';

/**
 * Directive to provide formatted prices.
 *
 * Examples:
 *
 * Default behaviour (without currency):
 * <span v-price="1000"></span> => 10.00
 *
 * Displaying with currency symbol behind:
 * <span v-price.currencyBefore="1000"></span> => CHF 10.00
 * <span v-price.currencyAfter="1000"></span> => 10.00 CHF
 *
 * @param {Object} options
 * @param {Boolean} options.value - The price value in cents.
 * @param {Boolean} [options.currencyBefore] - The modifier that renders the currency before the price.
 * @param {Boolean} [options.currencyAfter] - The modifier that renders the currency after the price.
 */
export default {
  name: 'price',

  bind(el, binding) {
    if (!binding.value && binding.value !== 0) {
      return;
    }

    el.innerHTML = formatPrice(binding.value, binding.modifiers.currencyBefore, binding.modifiers.currencyAfter);
  },

  update(el, binding) {
    if (!binding.value && binding.value !== 0) {
      return;
    }

    el.innerHTML = formatPrice(binding.value, binding.modifiers.currencyBefore, binding.modifiers.currencyAfter);
  },
};
