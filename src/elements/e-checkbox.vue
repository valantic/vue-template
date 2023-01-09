<template>
  <label :class="b(modifiers)"
         @mouseenter="hasHover = true"
         @mouseleave="hasHover = false">
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

<script>
  import formStates from '@/mixins/form-states';

  /**
   * Checkbox component for form elements.
   * Can be used as single element with a Boolean value or multiple checkboxes with an Array.
   */
  export default {
    name: 'e-checkbox',
    status: 0, // TODO: remove when component was prepared for current project.

    mixins: [formStates],
    inheritAttrs: false,

    model: {
      /**
       * Changes v-model behavior and use 'checked' instead of 'value' as prop.
       * Avoids conflict with default value attribute.
       */
      prop: 'checked',
      event: 'change',
    },

    props: {
      /**
       * Adds checked attribute to prevent type error
       */
      checked: {
        type: [Boolean, Array],
        required: true,
      },

      /**
       * Adds name attribute
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Adds value attribute
       */
      value: {
        type: [String, Number, Boolean],
        required: true,
      },
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
        get() {
          return this.checked;
        },
        set(value) {
          this.isChecked = value;

          /**
           * Emits checkbox value e.g. true/false or value
           *
           * @event change
           * @type {Boolean|Array}
           */
          this.$emit('change', value);
        },
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Emits focus to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onFocus() {
        this.hasFocus = true;

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
        this.hasFocus = false;

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
  };
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
