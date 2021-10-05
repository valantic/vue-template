<template>
  <label :class="b(modifiers)"
         @mouseenter="hover = true"
         @mouseleave="hover = false">
    <input
      v-model="internalValue"
      v-bind="$attrs"
      :class="b('field')"
      :aria-checked="isChecked ? 'true' : 'false'"
      :disabled="disabled"
      :value="value"
      :name="name"
      type="checkbox"
      @blur="onBlur"
      @focus="onFocus">
    <span :class="b('label')">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRefs } from 'vue';
  import useFormStates, { IFormStates, withProps } from '@/compositions/form-states';

  interface ISetup extends IFormStates {}

  /**
   * Checkbox component for form elements.
   * Can be used as single element with a Boolean value or multiple checkboxes with an Array.
   */
  export default defineComponent({
    name: 'e-checkbox',
    status: 0, // TODO: remove when component was prepared for current project.

    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        type: [Boolean, Array] as PropType<boolean | string[]>,
        required: true,
      },

      /**
       * Adds name attribute.
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Adds value attribute.
       */
      value: {
        type: [String, Number, Boolean],
        required: true,
      },
    },

    setup(props): ISetup {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns a configuration Object for modifier classes.
       *
       * @returns {Object}
       */
      modifiers() {
        return {
          ...this.stateModifiers,
          selected: this.internalValue === this.value,
        };
      },

      /**
       * Sets value of component model to parent model
       *
       * @returns  {Boolean|Array}   Status of the checkbox
       */
      internalValue: {
        get(): boolean | string[] {
          return this.modelValue;
        },
        set(value: boolean | string[]) {
          /**
           * Emits checkbox value e.g. true/false or value
           */
          this.$emit('update:modelValue', value);

          // event needed for the multiselect
          this.$emit('change', value);
        },
      },

      /**
       * Evaluates if the checkbox is currently selected.
       */
      isChecked() {
        return Array.isArray(this.value)
          ? this.value.includes(this.modelValue)
          : this.value;
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
       * Emits focus to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onFocus() {
        this.focus = true;

        /**
         * Focus event
         */
        this.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onBlur() {
        this.focus = false;

        /**
         * Blur event.
         */
        this.$emit('blur');
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-checkbox {
    $label-size: 16px;

    @include mixins.font(variables.$font-size--16, 22px);

    position: relative;
    display: block;
    cursor: pointer;

    &__field {
      position: absolute;
      left: -200vw;
      -webkit-appearance: none;
    }

    &__label {
      display: block;
      padding-left: variables.$spacing--25;
      margin: 0;

      &:hover {
        color: variables.$color-grayscale--0;

        &::before {
          border-color: variables.$color-grayscale--0;
        }
      }

      &::before,
      &::after {
        position: absolute;
        content: '';
        top: 3px;
        left: 0;
        width: $label-size;
        height: $label-size;
      }

      &::before {
        border: 1px solid variables.$color-grayscale--400;
      }

      &::after {
        transition: transform 0.1s ease-in-out;
        background: variables.$color-grayscale--0;
        opacity: 0;
        transform: scale(0);
      }
    }

    &__field:checked + &__label {
      color: variables.$color-grayscale--0;

      &::after {
        opacity: 1;
        transform: scale(0.6);
      }
    }

    &__field:disabled + &__label {
      color: variables.$color-grayscale--500;
      cursor: default;

      &:hover {
        color: variables.$color-grayscale--500;

        &::before {
          border-color: variables.$color-grayscale--500;
        }
      }

      &::before {
        border-color: variables.$color-grayscale--500;
      }
    }

    &__field:checked:disabled + &__label {
      &::after {
        background: variables.$color-grayscale--500;
      }
    }
  }
</style>
