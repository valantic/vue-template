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

export default (defaultValue: string = ''): IFormStates => {
  const inputState = ref<FieldStates>(FieldStates.Default);
  const active = ref<boolean>(false);
  const disabled = ref<boolean>(false);
  const focus = ref<boolean>(false);
  const hover = ref<boolean>(false);

  const stateModifiers: ComputedRef<IStateModifiers> = computed(() => ({
      state: inputState.value,
      active: active.value,
      disabled: disabled.value,
      focus: focus.value,
      hover: hover.value,
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
