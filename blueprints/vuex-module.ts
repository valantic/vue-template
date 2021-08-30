import { defineModule, localGetterContext } from 'direct-vuex';
import { moduleActionContext, moduleGetterContext } from '../src/store';

export interface IModXxxState {
  myProperty: string;
  myArray: string[];
}

/**
 * See https://github.com/paroi-tech/direct-vuex for more information
 */
const xxxModule = defineModule({
  namespaced: true,

  state: (): IModXxxState => ({
    /**
     * Stores the myProperty.
     */
    myProperty: 'some string',

    /**
     * Stores the myArray.
     */
    myArray: [],
  }),

  getters: {
    /**
     * Gets the current myProperty.
     */
    getMyProperty(state: IModXxxState): string {
      return state.myProperty;
    },

    /**
     * Gets the current myProperty.
     */
    getMyArray(...args): string[] {
      const {
        state,
        getters,
        rootState,
        rootGetters
      } = moduleXxxGetterContext(args); // eslint-disable-line no-use-before-define

      // Here, 'getters', 'state', 'rootGetters' and 'rootState' are typed.
      // Without 'moduleXxxGetterContext' only 'state' would be typed.
      // if you only need `state`, replace `...args` with `state: IModuleXxx` and remove the above variable assignments

      return state.myArray;
    },
  },

  mutations: {
    /**
     * Sets the myProperty.
     */
    setMyProperty(state, newValue: string): void {
      state.myProperty = newValue;
    },

    /**
     * Sets the myProperty.
     */
    setMyArray(state, newValue: string[]): void {
      state.myArray = newValue;
    },
  },

  actions: {
    /**
     * Accepts the initial data array of this store module.
     */
    data(context, payload: string[]) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'notification/data' is not of type Array.");
      }

      const {
        dispatch,
        commit,
        getters,
        state
      } = moduleXxxActionContext(context); // eslint-disable-line no-use-before-define

      // Here, 'dispatch', 'commit', 'getters' and 'state' are typed.
      // Without 'moduleXxxActionContext' only 'commit' would be typed.
      // if you only need `commit`, replace `context` with `{ context }` and remove the above variable assignments

      commit.setMyArray(payload);
    },
  },
});

export default xxxModule;

const moduleXxxGetterContext = (args: [any, any, any, any]) => localGetterContext(args, xxxModule);
const moduleXxxActionContext = (context: any) => moduleActionContext(context, xxxModule);
