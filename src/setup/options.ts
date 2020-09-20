import { i18n } from '@/setup/i18n';
import store from '@/store/index'; // MUST come after i18n because of build order.

interface Options {
  store: any;
  i18n: any;
}

const options: Options = {
  store,
  i18n,
};

export default options;
