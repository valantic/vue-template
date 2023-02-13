<template>
  <span :class="b(modifiers)">
    <select :value="internalValue"
            :class="b('select')"
            :disabled="disabled || progress"
            v-bind="$attrs"
            @change="onChange"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
    >
      <option v-if="placeholder"
              :disabled="!hasSelectablePlaceholder"
              value=""
      >
        {{ placeholder }}
      </option>
      <option v-for="option in options"
              :key="`${option[valueField]}`"
              :value="option[valueField]"
              :selected="option[valueField] === internalValue"
      >
        {{ option[labelField] }}
      </option>
    </select>
    <span :class="b('icon-wrapper')">
      <span v-if="!hasDefaultState" :class="b('icon-splitter')"></span>
      <e-icon v-if="!hasDefaultState && !focus"
              :class="b('state-icon')"
              :icon="stateIcon"
      />
      <span v-if="progress" :class="b('progress-container')">
        <e-progress />
      </span>
    </span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRefs } from 'vue';
  import i18n from '@/setup/i18n';
  import useFormStates, { IFormStates, withProps } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';
  import eIcon from '@/elements/e-icon.vue';

  interface IData {
    internalValue: string;
  }

  interface IOptions {
    [key: string]: string;
  }

  /**
   * Renders a styled select element. Options can be passed with the `options` property.
   */
  export default defineComponent({
    name: 'e-select',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eIcon,
    },
    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
        default: null,
        type: String,
      },

      /**
       * 'options' defines the options which are rendered in the select.
       *
       * e.g. `[{ <valueField>: 'id1', <labelField>: 'Label 1' },{ <valueField>: 'id2', <labelField>: 'Label 2' },...]`
       */
      options: {
        required: true,
        type: Array as PropType<IOptions[]>,
      },

      /**
       * The text to display if no option is selected by default.
       * The placeholder can also be disabled by passing 'false' to this prop.
       */
      placeholder: {
        type: [String, Boolean],
        default: i18n.global.t('e-select.chooseOption'),
        validator: (value: string | boolean) => typeof value === 'string' || !value,
      },

      /**
       * Defines if the placeholder text is selectable to reset the select (empty value).
       */
      hasSelectablePlaceholder: {
        type: Boolean,
        default: false,
      },

      /**
       * Shows a progress bar.
       */
      progress: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to change the default field, from which the value is taken for each option.
       */
      valueField: {
        type: String,
        default: 'value',
      },

      /**
       * Allows to change the default field, from which the label text is taken for each option.
       */
      labelField: {
        type: String,
        default: 'label',
      },
    },

    emits: ['update:modelValue'],

    setup(props): IFormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    data(): IData {
      return {
        internalValue: this.modelValue,
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Emits input event for v-model.
       */
      onChange(event: Event) {
        const select = event.currentTarget as HTMLSelectElement;

        this.internalValue = select.value;

        /**
         * input event fires on input
         */
        this.$emit('update:modelValue', select.value);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  $e-select-height: 30px;

  .e-select {
    $this: &;
    $height: 30px;

    position: relative;
    display: block;

    &__select {
      @include mixins.icon(arrow--down, 22px, right 5px center, $mask: false); // FF does not support mask on <select>.

      width: 100%;
      height: $height;
      padding: variables.$spacing--5 variables.$spacing--30 variables.$spacing--0 variables.$spacing--10;
      outline: none;
      border: 1px solid variables.$color-grayscale--500;
      border-radius: 3px;
      cursor: pointer;
      appearance: none;

      &::-ms-expand {
        display: none;
      }
    }

    .e-icon {
      display: flex;
      margin: auto;
    }

    // separator for state icons
    &__icon-wrapper {
      position: absolute;
      top: 50%;
      right: variables.$spacing--5;
      transform: translateY(-50%);
    }

    &__icon-splitter {
      position: absolute;
      top: 2px;
      right: 30px;
      height: calc(100% - 4px);
      border-left: 1px solid;
    }

    // hover
    &__select:hover,
    &--hover &__select {
      border: 1px solid variables.$color-grayscale--400;
    }

    // focus
    &__select:focus,
    &--focus &__select {
      outline: none;
    }

    // disabled
    &__select:disabled,
    &--disabled &__select,
    &--disabled &__select:hover {
      border-color: variables.$color-grayscale--600;
      color: variables.$color-grayscale--600;
    }

    /**
     * states
     */
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      color: variables.$color-status--error;

      #{$this}__select {
        @include mixins.icon(error, 22px, right 5px center, false); // FF does not support mask on <select>.

        border-color: variables.$color-status--error;
      }

      #{$this}__icon-splitter {
        border-color: variables.$color-status--error;
      }
    }

    &--state-error &__select:hover {
      border-color: variables.$color-status--error;
    }

    &--state-error &__select:focus {
      border: 1px solid variables.$color-status--error;
    }

    &--state-success {
      #{$this}__select {
        @include mixins.icon(check, 22px, right 5px center, false); // FF does not support mask on <select>.
      }

      #{$this}__icon-splitter {
        display: none;
      }
    }

    &__progress-container {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }
  }
</style>
