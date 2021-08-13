import { Store } from 'vuex';
import axios from 'axios/index';
import { IViewport } from '@/types/viewport';
import { IVueBemFunction } from '@/plugins/vue-bem-cn/src/globals';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for global properties
  interface ComponentCustomProperties {
    $store: Store<State>;
    $axios: typeof axios;
    $viewport: IViewport;
    gtmIdentifier: string;
    b: IVueBemFunction;
  }
}
