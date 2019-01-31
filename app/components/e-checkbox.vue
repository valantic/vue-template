<template>
  <div v-bem="stateModifiers">
    <label
      v-bem:label
      @mouseenter="hasHover = true"
      @mouseleave="hasHover = false">
      <input
        v-model="internalValue"
        v-bem:field
        :aria-checked="isChecked ? 'true' : 'false'"
        :disabled="disabled"
        :value="value"
        :name="name"
        v-bind="$attrs"
        type="checkbox"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus">
      <span v-bem:label-name>
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script>
  import formStates from '../mixins/form-states';

  /**
   * Checkbox component for form elements.
   * Can be used as single element with a Boolean value or multiple checkboxes with an Array.
   */
  export default {
    name: 'e-checkbox',
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
       * Sets value of component model to parent model
       *
       * @returns  {Boolean|Array}   Status of the checkbox
       */
      internalValue: {
        get() {
          return this.checked;
        },
        set(value) {
          /**
           * Emits checkbox value e.g. true/false or value
           *
           * @event change
           * @type {Boolean|Array}
           */
          this.$emit('change', value);
        }
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
       * Emits state to parent and wrapper component.
       * Update "isChecked" state.
       *
       * @param   {Boolean}  event   Field input
       */
      onChange(event) {
        this.isChecked = event.target.checked;

        /**
         * Change event
         *
         * @event change
         * @type {String}
         */
        this.$parent.$emit('change');
      },

      /**
       * Updates the checked state of the checkbox.
       */
      updateCheckedState() {
        if (typeof this.value === 'string') {
          this.isChecked = this.checked.indexOf(this.value.trim()) > -1;
        } else if (typeof this.value === 'number') {
          this.isChecked = this.checked.indexOf(this.value) > -1;
        }
      },

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
        this.$parent.$emit('focus');
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
        this.$parent.$emit('blur');
      }
    }
    // render() {},
  };
</script>

<style lang="scss">
  .e-checkbox {
    @include font($font-size--14, 18px);

    &__field {
      position: absolute;
      left: -9999px;
      -webkit-appearance: none;
    }

    // general label
    &__label {
      display: block;
      color: $color-grayscale--400;
      cursor: pointer;
      position: relative;
      padding-left: $spacing--25;
      margin: 0;

      // custom field
      &::before {
        background: $color-grayscale--1000;
        border-radius: 3px;
        border: 1px solid $color-grayscale--500;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 17px;
        height: 17px;
        transition: border $transition-duration-300 ease;
      }

      // custom field marker
      &::after {
        background: transparent url('../assets/icons/i-check.svg') no-repeat center;
        background-size: 20px;
        border-top: none;
        border-right: none;
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        height: 17px;
        width: 17px;
        opacity: 0;
        transform: scale(0);
        transition: all $transition-duration-100;
      }
    }

    /* stylelint-disable no-descending-specificity */

    // checked label
    &--checked &__label,
    &__field:checked + &__label {
      color: $color-secondary--1;

      // custom field checked
      &::before {
        border: 1px solid $color-secondary--2;
      }

      // custom field marker checked
      &::after {
        opacity: 1;
        transform: scale(1);
      }
    }

    // disabled label
    &--disabled &__label,
    &__field:disabled + &__label {
      color: $color-grayscale--450;
      cursor: default;

      // custom field disabled
      &::before,
      &:hover::before {
        border: 1px solid $color-grayscale--600;
      }

      // custom field marker disabled
      &::after {
        background: transparent url('../assets/icons/i-check--disabled.svg') no-repeat center;
      }
    }

    // focus label
    &--focus &__label,
    &__field:focus + &__label {

      // custom field focus
      &::before {
        border: 1px solid $color-secondary--2;
      }
    }

    // hover label
    &--hover &__label,
    &__field:hover + &__label {

      // custom field hover
      &::before {
        border: 1px solid $color-secondary--2;
      }
    }
  }
</style>
