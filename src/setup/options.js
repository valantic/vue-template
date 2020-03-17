import Vuetify from 'vuetify/lib';
import { i18n } from '@/setup/i18n';
import store from '@/store/index'; // MUST come after i18n because of build order.

export default {
  el: '#app',
  vuetify: new Vuetify(), // TODO: only enable if required by project.
  store,
  i18n,
};
