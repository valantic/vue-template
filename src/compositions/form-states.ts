import {
  computed,
  ComputedRef, Ref,
  ref,
} from 'vue';

export enum FieldStates {
  Default = 'default',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

interface IStateModifiers {
  state: FieldStates;
  active: boolean;
  disabled: boolean;
  focus: boolean;
  hover: boolean;
}

export interface IFormStates {
  active: Ref<boolean>;
  disabled: Ref<boolean>;
  focus: Ref<boolean>;
  hover: Ref<boolean>;
  state: Ref<FieldStates>;
  stateModifiers: ComputedRef<IStateModifiers>;
  stateIcon: ComputedRef<string>;
  hasDefaultState: ComputedRef<boolean>;
}

/**
 * Defines the reactive properties which can be used for form elements
 */
const formStates = (): IFormStates => {
  const inputState = ref<FieldStates>(FieldStates.Default);
  const active = ref<boolean>(false);
  const disabled = ref<boolean>(false);
  const focus = ref<boolean>(false);
  const hover = ref<boolean>(false);

  /**
   * Holds an object with several modifiers of the form element.
   */
  const stateModifiers: ComputedRef<IStateModifiers> = computed(() => ({
      state: inputState.value,
      active: active.value,
      disabled: disabled.value,
      focus: focus.value,
      hover: hover.value,
    }));

  /**
   * Holds a boolean if the form element has default state.
   */
  const hasDefaultState: ComputedRef<boolean> = computed(() => inputState.value === FieldStates.Default);

  /**
   * Holds a string containing the icon name matching the current form element state.
   */
  const stateIcon: ComputedRef<string> = computed(() => {
    switch (inputState.value) {
      case FieldStates.Error:
        return 'error';

      case FieldStates.Success:
        return 'check';

      case FieldStates.Info:
        return 'info';

      default:
        return '';
    }
  });

  return {
    // data
    active,
    disabled,
    focus,
    hover,
    state: inputState,

    // computed
    stateModifiers,
    stateIcon,
    hasDefaultState,
  };
};

export default formStates;
