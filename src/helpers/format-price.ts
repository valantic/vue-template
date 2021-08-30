import { i18n } from '@/setup/i18n';

/**
 * Formats the price according to project standards (Price value in cents).
 */
export default function formatPrice(value: string, currencyBefore: boolean, currencyAfter: boolean): string | null {
  const locale = 'de-CH'; // TODO - replace hardcoded locale
  const currency = 'CHF'; // TODO - replace hardcoded currency

  const valueParsed = parseFloat(value);

  // If we don't get a number, we don't modify the content.
  if (Number.isNaN(value)) {
    return null;
  }

  const formattedPrice = i18n.global.n(valueParsed / 100, 'currency', locale).replace(/’|'/g, '\u0020'); // Divide by 100 because we get prices in centimes.
  const beforePriceSlot = currencyBefore ? `${currency} ` : '';
  const afterPriceSlot = currencyAfter ? ` ${currency}` : '';

  return `${beforePriceSlot}${formattedPrice}${afterPriceSlot}`;
}
