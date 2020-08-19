import { i18n } from '@/setup/i18n';
import store from '@/store/index'; // MUST come after i18n because of build order.
import { apolloProvider } from '@/graphql/graphql';

export default {
  store,
  i18n,
  apolloProvider,
};
