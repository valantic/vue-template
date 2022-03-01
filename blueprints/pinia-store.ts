import { defineStore } from 'pinia';

export interface IStoreState { // TODO: update <Store>.
  myProperty: string;
  myArray: string[];
}

/**
 * Holds the name of the store.
 */
const storeName: string = 'car';

export const useCarStore = defineStore(storeName, {
  state: (): IModXxxState => {
    const initialData = window.initialData?.[storeName] || {};
    const { myProperty, myArray } = initialData || {};

    const state: IModXxxState = {
      /**
       * Stores the myProperty.
       */
      myProperty: 'some string',

      /**
       * Stores the myArray.
       */
      myArray: [],
    };

    if (Array.isArray(myArray) && myArray.length) {
      state.myArray = myArray;
    }

    if (myProperty) {
      state.myProperty = myProperty;
    }

    return state;
  },
  getters: {
    /**
     * Gets the current myProperty.
     */
    getMyProperty(): string {
      return this.myProperty;
    },

    /**
     * Gets the current myProperty.
     */
    getMyArray(): string[] {
      return this.myArray;
    }
  },
  actions: {
    /**
     * Sets the myProperty.
     */
    setMyProperty(newValue: string): void {
      this.myProperty = newValue;
    },

    /**
     * Sets the myProperty.
     */
    setMyArray(newValue: string[]): void {
      this.myArray = newValue;
    },
  },
});
