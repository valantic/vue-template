<template>
  <span :class="b(modifiers)">
    <!-- @slot Slot is used for the notification content (message) -->
    <slot></slot>
  </span>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import useFormStates, { IFormStates, withProps } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  /**
   * Component is used to display a notification (status message) directly in the form field.
   * It needs a content and a state
   */
  export default defineComponent({
    name: 'c-form-notification',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    props: {
      ...withProps(),
    },

    setup(props): IFormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
      * Defines state modifier classes.
      */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
        };
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-form-notification {
    @include mixins.font(variables.$font-size--14, 18px);

    display: block;
    padding: variables.$spacing--10 35px variables.$spacing--10 variables.$spacing--5;
    border-bottom-right-radius: variables.$border-radius--500;
    border-bottom-left-radius: variables.$border-radius--500;
    background-repeat: no-repeat;
    background-position-x: calc(100% - 5px);
    background-position-y: calc(#{variables.$font-size--18} / 2 - 2px);
    background-size: 20px;
    box-shadow: 0 4px 10px 1px rgba(variables.$color-grayscale--400, 0.3);
    color: variables.$color-grayscale--1000;

    &--state-error {
      background-color: variables.$color-status--error;
    }

    &--state-info {
      background-color: variables.$color-status--info;
    }

    &--state-success {
      background-color: variables.$color-status--success;
    }
  }
</style>
