import { reactive } from 'vue';

type FocusState = {
  enabled: boolean;
  variant?: string;
};

const state: FocusState = reactive({
  /**
   * The current focus state (enabled/disabled).
   */
  enabled: false,

  /**
   * Allows to use alternative mask variants.
   */
  variant: undefined,
});

export default state;
