<template>
  <label :class="b(stateModifiers)"
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
      @change="onChange"
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
    // beforeUnmount() {},
    // unmounted() {},

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
      },
    },
    // render() {},
  };
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
