import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
// eslint-disable-next-line id-length
import { Plugin } from 'vue';
import de from 'dayjs/locale/de';

/**
 * Holds the date format templates used with dayjs.
 */
/* eslint-disable @typescript-eslint/naming-convention */
export enum DateFormat {
  DD_MM_YYYY = 'DD.MM.YYYY',
  DD_MM_YYYY_HH_mm = 'DD.MM.YYYY HH:mm',
  dddd_DD_MMMM_YYYY = 'dddd [/] DD. MMMM YYYY',
  dddd_DD_MMMM_YYYY_HH_mm = 'dddd [/] DD. MMMM YYYY HH:mm'
}

const plugin: Plugin = {
  install(app) {
    dayjs.locale('de-ch', de);
    dayjs.extend(customParseFormat);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isBetween);

    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dayjs = dayjs;
  },
};

export default plugin;
