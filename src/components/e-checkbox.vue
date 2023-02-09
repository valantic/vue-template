<template>
  <label :class="b(modifiers)"
         @mouseenter="hover = true"
         @mouseleave="hover = false"
  >
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
      @focus="onFocus"
    >
    <span :class="b('indicator')"></span>
    <span :class="b('label-text')">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRefs } from 'vue';
  import useFormStates, { IFormStates, withProps } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

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
        type: [Boolean, Array] as PropType<any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- was not able to find a better solution, since the value is very dynamic
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
        type: [String, Number, Boolean] as PropType<any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- was not able to find a better solution, since the value is very dynamic
        required: true,
      },

      /**
       * Allows to set the desired layout variant.
       */
      variant: {
        type: String,
        default: 'default',
        validator: (value: string) => [
          'default',
          'toggle',
        ].includes(value),
      },
    },

    emits: ['update:modelValue', 'change', 'focus', 'blur'],

    setup(props): IFormStates {
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
       */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
          variant: this.variant,
        };
      },

      /**
       * Sets value of component model to parent model
       */
      internalValue: {
        get(): boolean | string[] | number[] {
          return this.modelValue;
        },
        set(value: boolean | string[] | number[]) {
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
  @use 'sass:math';
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-checkbox {
    $this: &;
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

    &--variant-default {
      display: flex;
      align-items: center;

      #{$this}__indicator {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        width: $label-size;
        height: $label-size;
        border: 1px solid variables.$color-grayscale--400;
        border-radius: 3px;
        background: variables.$color-grayscale--1000;

        &::before {
          content: '';
          width: $label-size;
          height: $label-size;
          opacity: 0;
          border: 1px solid transparent;
          border-radius: 3px;
          background: variables.$color-grayscale--0;
          transform: scale(0);
          transition-timing-function: ease-in-out;
          transition-duration: 100ms;
          transition-property: opacity, transform;
          inset: 0;
        }
      }

      #{$this}__field:checked {
        ~ #{$this}__indicator::before {
          opacity: 1;
          transform: scale(0.6);
        }
      }
    }

    &--variant-toggle {
      $toggle--size: 1rem;

      display: flex;
      align-items: center;
      cursor: pointer;

      #{$this}__indicator {
        position: relative;
        width: 1.5 * $toggle--size;
        height: math.div($toggle--size, 3) * 2;
        margin: 0 math.div($toggle--size, 2);
        border-radius: $toggle--size;
        background-color: variables.$color-grayscale--500;
        transition: background-color variables.$transition-duration--300;

        &::before {
          position: absolute;
          top: 50%;
          left: math.div($toggle--size, -2);
          content: '';
          width: $toggle--size;
          height: $toggle--size;
          border-radius: 50%;
          background-color: variables.$color-grayscale--1000;
          box-shadow: 0 1px 2px 1px rgba(variables.$color-grayscale--0, 0.2);
          transform: translateY(-50%);
          transition: left variables.$transition-duration--300;
        }
      }

      #{$this}__field {
        &:checked ~ #{$this}__indicator {
          &::before {
            left: calc(100% - (#{$toggle--size} / 2));
            background-color: variables.$color-grayscale--0;
            transform: translateY(-50%);
          }
        }
      }
    }

    &__label-text {
      display: block;
      margin: 0;
      padding-left: variables.$spacing--10;

      &:hover {
        color: variables.$color-grayscale--0;

        &::before {
          border-color: variables.$color-grayscale--0;
        }
      }
    }

    &__field:checked {
      ~ #{$this}__label-text {
        color: variables.$color-grayscale--0;
      }
    }

    &__field:disabled + &__label-text {
      cursor: default;
      color: variables.$color-grayscale--500;

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

    &__field:checked:disabled + &__label-text {
      &::after {
        background: variables.$color-grayscale--500;
      }
    }
  }
</style>
