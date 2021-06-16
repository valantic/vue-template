import { Store } from 'vuex';
import axios from 'axios/index';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $http: typeof axios
    gtmIdentifier: string;
  }
}
