import { ComputedRef, PropType, Ref, computed, ref } from 'vue';

export enum FieldState {
  Default = 'default',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

type StateModifiers = {
  state: FieldState;
  active: boolean;
  focus: boolean;
  hover: boolean;
};

export type FormStates = {
  active: Ref<boolean>;
  focus: Ref<boolean>;
  hover: Ref<boolean>;
  stateModifiers: ComputedRef<StateModifiers>;
  stateIcon: ComputedRef<Icon | null>;
  hasDefaultState: ComputedRef<boolean>;
};

// eslint-disable-next-line -- TODO: did not know how to fix the return type so it is valid on component side.
export const withProps = () => ({
  /**
   * Form states for class names (default, error, success, warning, info)
   */
  state: {
    type: String as PropType<FieldState>,
    default: 'default',
    validator: (value: string): boolean => ['error', 'success', 'warning', 'info', 'default'].includes(value),
  },
});

/**
 * Defines the reactive properties which can be used for form elements
 */
const formStates = (inputState: Ref<FieldState>): FormStates => {
  const active = ref<boolean>(false);
  const focus = ref<boolean>(false);
  const hover = ref<boolean>(false);

  /**
   * Holds an object with several modifiers of the form element.
   */
  const stateModifiers: ComputedRef<StateModifiers> = computed(() => ({
    state: inputState.value,
    active: active.value,
    focus: focus.value,
    hover: hover.value,
  }));

  /**
   * Holds a boolean if the form element has default state.
   */
  const hasDefaultState: ComputedRef<boolean> = computed(() => inputState.value === FieldState.Default);

  /**
   * Holds a string containing the icon name matching the current form element state.
   */
  const stateIcon: ComputedRef<Icon | null> = computed(() => {
    switch (inputState.value) {
      case FieldState.Error:
        return 'i-error';

      case FieldState.Success:
        return 'i-check';

      case FieldState.Info:
        return 'i-info';

      default:
        return null;
    }
  });

  return {
    // data
    active,
    focus,
    hover,

    // computed
    stateModifiers,
    stateIcon,
    hasDefaultState,
  };
};

export default formStates;
