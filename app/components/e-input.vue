<!-- This component has no <template> because of dynamic root element -->

<template>

  <div :class="b({ state })">
    <input :class="b('field')"
           :disabled="$attrs.disabled"
           :placeholder="$attrs.placeholder"
           :value="$attrs.value">
  </div>

</template>

<script>
  export default {
    name: 'e-input',
    // components: {},
    // mixins: [],

    props: {

      /**
       * User input
       */
      input: {
        default: null,
        required: false,
        type: String
      },

      // value

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
      }
    },

    // computed: {
    //   return {}
    // },

    // data() {
    //   return {};
    // },

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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .e-input {
    position: relative;

    &::before,
    &::after {
      content: "";
      display: block;
      height: 55%;
      left: 0;
      position: absolute;
      z-index: 1;
      top: 20%;
      width: 100%;
      @include media(sm) {
        width: 151px;
      }
    }

    &::before {
      border-left: 1px solid $color-primary--3;
    }

    &::after {
      border-right: 1px solid $color-primary--3;
    }

    &__field {
      border: 1px solid $color-grayscale--300;
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

      &:hover {
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
