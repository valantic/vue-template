import { i18n } from '@/setup/i18n';

/**
 * Returns a date format string for the currently used localization.
 *
 * @param {String} [locale] - Allows to use an alternative locale. By default, the computer systems local is used.
 *
 * @returns {String}
 */
export default function getLocalizedDateFormat(locale = i18n.locale) {
  const customDate = new Date(2222, 11, 18);
  const strDate = customDate.toLocaleDateString(locale);

  return strDate
    .replace('12', 'MM')
    .replace('18', 'DD')
    .replace('2222', 'YYYY');
}
