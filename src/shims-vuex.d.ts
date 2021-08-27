import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
