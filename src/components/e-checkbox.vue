<template>
  <label :class="b(stateModifiers)"
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
      @change="onChange"
      @focus="onFocus">
    <span :class="b('label')">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import useFormStates, { IFormStates } from '@/compositions/form-states';

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

    setup(): ISetup {
      return {
        ...useFormStates(),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {
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
           *
           * @event change
           * @type {Boolean|Array}
           */
          this.$emit('update:modelValue', value);

          // event needed for the multiselect
          this.$emit('change', value);
        },
      },

      /**
       * Evaluates if the checkbox is currently selected.
       *
       * @returns {Boolean}
       */
      isChecked() {
        return Array.isArray(this.value)
          ? this.value.includes(this.modelValue)
          : this.value;
      }
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
       * Emits state to parent and wrapper component.
       */
      onChange() {
        /**
         * Change event
         *
         * @event change
         * @type {String}
         */
        this.$emit('change');
      },

      /**
       * Emits focus to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onFocus() {
        this.focus = true;

        /**
         * Focus event
         *
         * @event focus
         * @type {String}
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
         *
         * @event blur
         * @type {String}
         */
        this.$emit('blur');
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
.e-checkbox {
  $this: &;
  $label-size: 17px;

  @include font($font-size--16);

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
    padding-left: $spacing--25;
    margin: 0;

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
      border: 1px solid $color-grayscale--0;
    }

    &::after {
      background: $color-grayscale--0;
      opacity: 0;
      transform: scale(0);
    }
  }

  &__field:checked + &__label {
    color: $color-primary--1;

    &::after {
      opacity: 1;
      transform: scale(0.6);
    }
  }

  &__field:disabled + &__label {
    color: $color-grayscale--500;
    cursor: default;

    &::before {
      border-color: $color-grayscale--500;
    }
  }

  &__field:checked:disabled + &__label {
    &::after {
      background: $color-grayscale--500;
    }
  }
}
</style>
