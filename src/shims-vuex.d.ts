import { Store } from 'vuex';
import { AppStore, IStore } from '@/store';

declare module '@vue/runtime-core' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $store: Store<IStore>;
  }
}

declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}
