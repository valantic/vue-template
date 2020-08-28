<template>
  <div :class="b(modifiers)">
    <!-- @slot Slot is used for the notification content (message) -->
    <slot></slot>
  </div>
</template>

<script>
  import formStates from '../mixins/form-states';

  /**
   * Component is used to display a notification (status message) directly in the form field.
   * It needs a content and a state
   */
  export default {
    name: 'c-form-notification',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    mixins: [formStates],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {

      /**
      * Defines state modifier classes.
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
    background-position-y: calc(#{$font-size--18} / 2 - 2px);
    background-repeat: no-repeat;
    border-bottom-left-radius: $border-radius--500;
    border-bottom-right-radius: $border-radius--500;
    color: $color-grayscale--1000;
    box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);

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
