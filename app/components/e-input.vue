<!-- This component has no <template> because of dynamic root element -->

<template>

  <div :class="b(modifiers)">
    <input :value="value"
           :class="b('field')"
           :disabled="disabled"
           :placeholder="$attrs.placeholder"
           @blur="hasFocus = false"
           @focus="hasFocus = true"
           @input="input($event.target.value)"
           @mouseenter="hasHover = true"
           @mouseleave="hasHover = false"
    >
  </div>

</template>

<script>
  export default {

    name: 'e-input',
    inheritAttrs: false,

    // components: {},
    // mixins: [],

    props: {

      /**
       * User input passed by v-model
       */
      value: {
        default: null,
        required: false,
        type: String
      },

      /**
       * Adds the state to the input field
       */
      state: {
        default: null,
        required: false,
        type: String,
        validator(value) {
          return [
            'error',
            'info',
            'success',
          ].includes(value);
        }
      },

      /**
       * Adds active state
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Adds disabled state
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Adds focus state
       */
      focus: {
        type: Boolean,
        default: false,
      },

      /**
       * Adds hover state
       */
      hover: {
        type: Boolean,
        default: false,
      },

    },

    data() {
      return {
        isActive: this.$props.active,
        isDisabled: this.$props.disabled,
        hasFocus: this.$props.focus,
        hasHover: this.$props.hover,
      };
    },

    computed: {

      /**
       * Adds state modifier classes to e-input
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          active: this.isActive,
          disabled: this.isDisabled,
          focus: this.hasFocus,
          hover: this.hasHover,
          state: this.state,
        };
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Emits input to parent component
       * @param   {String}  value   Field input
       */
      input(value) {
        this.$emit('input', value);
      }

    }
    // render() {},
  };
</script>

<style lang="scss">
  .e-input {
    @include half-border($color-grayscale--500);

    border: 1px solid transparent;
    position: relative;

    // input
    &__field {
      border: 1px solid transparent;
      border-radius: 2px;
      color: $color-grayscale--400;
      font-family: $font-family--primary;
      font-size: $font-size--14;
      position: relative;
      transition: box-shadow 0.15s ease-in-out;
      width: 100%;
      padding: $spacing--5 $spacing--10;
    }

    // placeholder
    &__field::placeholder {
      color: $color-grayscale--400;
    }

    // active
    &__field:active,
    &--active > &__field {
      border: 1px solid $color-grayscale--500;
    }

    // focus
    &__field:focus,
    &--focus > &__field {
      border: 1px solid $color-grayscale--500;
      box-shadow: 0 2px 5px -2px rgba($color-grayscale--400, 0.75);
      color: $color-secondary--1;
      outline: none;
    }

    // hover
    &__field:hover,
    &--hover > &__field {
      border: 1px solid $color-grayscale--500;
    }

    /**
    * states
    **/

    // error
    &--state-error {
      @include half-border($color-secondary--4);
    }

    // info
    &--state-info {
      // ...
    }

    // success
    &--state-success {
      // ...
    }

    // disabled
    &__field:disabled,
    &--disabled > &__field,
    &--disabled > &__field:hover {
      border: 1px solid $color-grayscale--600;
      color: $color-grayscale--600;
    }

    &--disabled::before,
    &--disabled::after {
      border-color: $color-grayscale--600;
    }
  }
</style>
