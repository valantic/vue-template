import {
  computed,
  ComputedRef,
  PropType,
  Ref,
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
  stateModifiers: ComputedRef<IStateModifiers>;
  stateIcon: ComputedRef<string>;
  hasDefaultState: ComputedRef<boolean>;
}

export const withProps = () => ({ // eslint-disable-line -- TODO: did not know how to fix the return type so it is valid on component side.
  /**
   * Form states for class names (default, error, success, warning, info)
   */
  state: {
    type: String as PropType<FieldStates>,
    default: 'default',
    validator: (value: string): boolean => [
      'error',
      'success',
      'warning',
      'info',
      'default',
    ].includes(value),
  },
});

/**
 * Defines the reactive properties which can be used for form elements
 */
const formStates = (inputState: Ref<FieldStates>): IFormStates => {
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
        return 'i-error';

      case FieldStates.Success:
        return 'i-check';

      case FieldStates.Info:
        return 'i-info';

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

    // computed
    stateModifiers,
    stateIcon,
    hasDefaultState,
  };
};

export default formStates;
