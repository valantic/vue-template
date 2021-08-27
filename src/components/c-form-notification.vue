<template>
  <span :class="b(modifiers)">
    <!-- @slot Slot is used for the notification content (message) -->
    <slot></slot>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useFormStates, { IFormStates } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface ISetup extends IFormStates {}

  /**
   * Component is used to display a notification (status message) directly in the form field.
   * It needs a content and a state
   */
  export default defineComponent({
    name: 'c-form-notification',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // props: {},

    setup(): ISetup {
      return {
        ...useFormStates(),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {

      /**
      * Defines state modifier classes.
      *
      * @returns  {Object}   BEM classes
      */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers
        };
      }
    }
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
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
      background-color: $color-status--danger;
    }

    &--state-info {
      background-color: $color-status--info;
    }

    &--state-success {
      background-color: $color-status--success;
    }
  }
</style>
