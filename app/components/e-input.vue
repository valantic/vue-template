<template>

  <div :class="b(modifiers)">
    <input
      :class="b('field')"
      :disabled="disabled"
      :name="name"
      :placeholder="$attrs.placeholder"
      :value="value"
      type="text"
      @blur="hasFocus = false"
      @focus="hasFocus = true"
      @input="onInput"
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
       * Value passed by v-model
       */
      value: {
        default: null,
        type: String
      },

      /**
       * Adds name attribute
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * Adds the state to the input field
       * Valid states are: 'error', 'info', 'success'
       */
      state: {
        default: null,
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
       * Defines state modifier classes
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          active: this.$props.active || this.isActive,
          disabled: this.$props.disabled || this.isDisabled,
          focus: this.$props.focus || this.hasFocus,
          hover: this.$props.hover || this.hasHover,
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
       *
       * @param   {String}  event   Field input
       */
      onInput(event) {
        this.$emit('input', event.target.value);
      },

    }
    // render() {},
  };
</script>

<style lang="scss">
  .e-input {
    @include half-border($color-grayscale--500);

    // input
    &__field {
      border: 1px solid transparent;
      border-radius: $border-radius--default;
      color: $color-grayscale--400;
      font-family: $font-family--primary;
      font-size: $font-size--14;
      height: 30px;
      position: relative;
      transition: box-shadow 0.15s ease-in-out;
      width: 100%;
      padding: $spacing--5 $spacing--10;

      // disable iPhone styling
      -webkit-appearance: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    // remove x on in put field wihtin IE
    &__field::-ms-clear {
      display: none;
      height: 0;
      width: 0;
    }

    // Hide autofill Safari icon
    &__field::-webkit-contacts-auto-fill-button {
      visibility: hidden;
      pointer-events: none;
      position: absolute;
      right: 0;
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
      box-shadow: 0 2px 5px 0 rgba($color-grayscale--400, 0.5);
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

    &--state-error {
      @include half-border($color-secondary--4);
      // TODO add info message and icon
    }
    &--state-error &__field:hover {
      border: 1px solid $color-secondary--4;
    }

    &--state-error > &__field:focus {
      border: 1px solid $color-secondary--4;
    }

    &--state-info {
      // TODO add info message and icon
    }

    &--state-success {
      // TODO add info message and icon
    }

    // placeholder
    &__field::-webkit-input-placeholder, // WebKit, Blink, Edge
    &__field:-moz-placeholder, // Mozilla Firefox 4 to 18
    &__field:-ms-input-placeholder, // Internet Explorer 10-11
    &__field::placeholder { // Most modern browsers support this now
      color: $color-grayscale--400;
      opacity: 1;
    }

    // disabled
    &__field:disabled,
    &--disabled &__field,
    &--disabled &__field:hover {
      background: $color-grayscale--1000;
      border: none;
      color: $color-grayscale--600;

      &::placeholder {
        color: $color-grayscale--600;
      }

    }

    &--disabled::before,
    &--disabled::after {
      border-color: $color-grayscale--600;
    }
  }
</style>
