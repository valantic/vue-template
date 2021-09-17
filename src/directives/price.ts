import formatPrice from '@/helpers/format-price';
import { DirectiveBinding } from '@vue/runtime-core';

/**
 * Formats the html content of the provided element as price.
 */
function format(el: HTMLElement, binding: DirectiveBinding) {
  if (!binding.value && binding.value !== 0) {
    return;
  }

  const priceInput = parseFloat(binding.value);

  el.innerHTML = Number.isNaN(priceInput)
    ? ''
    : formatPrice(parseFloat(binding.value), binding.modifiers.currencyBefore, binding.modifiers.currencyAfter) || '';
}

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
 */
export default {
  name: 'price',

  beforeMount: format,
  updated: format,
};
