import { i18n } from './i18n';
import store from '@/store/index'; // MUST come after i18n because of build order.

export default {
  el: '#app',
  store,
  i18n,
};
