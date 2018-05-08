<template>
  <div :class="b(modifiers)">
    <!-- @slot Slot is used for the notification content (message) -->
    <slot></slot>
  </div>
</template>

<script>
  import formStates from '@/mixins/form-states';

  // TODO: Mixin properties not visible in styleguide => check after update styleguidist
  export default {
    name: 'c-form-notification',
    // components: {},
    mixins: [formStates],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {

      /**
      * Defines state modifier classes
      *
      * @returns  {Object}   BEM classes
      */
      modifiers() {
        return {
          ...this.stateModifiers
        };
      }
    }
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
  .c-form-notification {
    @include font($font-size--14, 18px);

    display: block;
    padding: $spacing--10 35px $spacing--10 $spacing--5;
    background-size: 20px;
    background-position-x: calc(100% - 5px);
    background-position-y: calc(#{$font-size--18} / 2 - 5px);
    background-repeat: no-repeat;
    border-bottom-left-radius: $border-radius--default;
    border-bottom-right-radius: $border-radius--default;
    color: $color-grayscale--1000;

    &--state-error {
      background-image: url('../assets/icons/i-error--negative.svg');
      background-color: $color-status--danger;
    }

    &--state-info {
      background-image: url('../assets/icons/i-info--negative.svg');
      background-color: $color-status--info;
    }

    &--state-success {
      background-image: url('../assets/icons/i-check--negative.svg');
      background-color: $color-status--success;
    }
  }
</style>
