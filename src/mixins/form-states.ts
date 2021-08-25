import {
  computed,
  ComputedRef, Ref,
  ref,
  WritableComputedRef
} from 'vue';

// eslint-disable-next-line no-shadow
enum FieldStates {
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
  checked: boolean;
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
  isChecked: WritableComputedRef<boolean>;
}

export default (defaultValue: string = ''): IFormStates => {
  const inputState = ref<FieldStates>(FieldStates.Default);
  const inputValue = ref<string>(defaultValue);

  const active = ref<boolean>(false);
  const disabled = ref<boolean>(false);
  const focus = ref<boolean>(false);
  const hover = ref<boolean>(false);
  const checked = ref<boolean | string[]>(false);

  const isChecked: WritableComputedRef<boolean> = computed({
    get(): boolean {
      return Array.isArray(checked.value) ? checked.value.includes(inputValue.value) : checked.value;
    },
    set(newValue: boolean): boolean {
      return newValue;
    },
  });

  const stateModifiers: ComputedRef<IStateModifiers> = computed(() => ({
      state: inputState.value,
      active: active.value,
      disabled: disabled.value,
      focus: focus.value,
      hover: hover.value,
      checked: isChecked.value,
    }));

  const hasDefaultState: ComputedRef<boolean> = computed(() => inputState.value === FieldStates.Default);

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
    active,
    disabled,
    focus,
    hover,
    state: inputState,
    stateModifiers,
    stateIcon,
    hasDefaultState,
    isChecked,
  };
};
