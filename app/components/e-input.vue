<!-- This component has no <template> because of dynamic root element -->

<template>

  <div :class="b(modifiers)">
    <input :value="value"
           :class="b('field')"
           :disabled="$attrs.disabled"
           :placeholder="$attrs.placeholder"
           @blur=""
           @focus=""
           @input="input($event.target.value)"
           @mouseenter="hasHover = true"
           @mouseleave="hasHover = false"
           @mousedown=""
           @mouseup=""
    >
  </div>

</template>

<script>
  export default {
    name: 'e-input',
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

      //
      hover: {
        type: Boolean,
        default: false,
      }
    },

    data() {
      return {
        hasHover: this.$props.hover
      };
    },

    computed: {
      modifiers() {
        return {
          state: this.state,
          hover: this.hasHover
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
       * @param   {String}    value   Field input
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
    position: relative;

    &__field {
      border: 1px solid $color-grayscale--500;
      border-radius: 2px;
      color: $color-grayscale--400;
      font-family: $font-family--primary;
      font-size: $font-size--14;
      height: 18px;
      line-height: 18px;
      position: relative;
      width: 100%;
      padding: $spacing--5 $spacing--10;

      @include media(sm) {
        width: 130px;
      }

      &::placeholder {
        color: $color-grayscale--400;
      }

      &:disabled {
        border-color: $color-grayscale--600;
        color: $color-grayscale--600;
      }

      &:hover,
      &--hover {
        // full border...
      }

      &:active,
      &:focus {
        box-shadow: 0 2px 5px -2px rgba($color-grayscale--400, 0.75);
        color: $color-secondary--1;
        outline: none;
      }
    }
  }

  /**
  * states
  **/

  // error
  .e-input--state-error .e-input__field {
    border-color: $color-secondary--4;
  }

  // info
  .e-input--state-info .e-input__field {

  }

  // success
  .e-input--state-success .e-input__field {

  }
</style>
