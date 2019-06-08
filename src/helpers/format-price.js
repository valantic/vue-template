import { i18n } from '@/setup/i18n';

/**
 * Formats the price according to project standards (Price value in cents).
 *
 * @param {Number|String} value - The price value.
 * @param {Boolean} [currencyBefore] - The currency will be added before the value.
 * @param {Boolean} [currencyAfter] - The currency will be added after the value.
 *
 * @returns {String | null}
 */
export default function formatPrice(value, currencyBefore, currencyAfter) {
  const locale = 'de-CH'; // TODO - replace hardcoded locale
  const currency = 'CHF'; // TODO - replace hardcoded currency

  value = parseFloat(value);

  // If we don't get a number, we don't modify the content.
  if (Number.isNaN(value)) {
    return null;
  }

  const formattedPrice = i18n.n(value / 100, 'currency', locale).replace(/’|'/g, '\u0020'); // Divide by 100 because we get prices in centimes.
  const beforePriceSlot = currencyBefore ? `${currency} ` : '';
  const afterPriceSlot = currencyAfter ? ` ${currency}` : '';

  return `${beforePriceSlot}${formattedPrice}${afterPriceSlot}`;
}
