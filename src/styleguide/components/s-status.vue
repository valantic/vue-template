<template>
  <div :class="b(modifiers)">
    <span :class="b('inner')">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';
  import { availableStatus } from '@/plugins/styleguide.status-label';

  /**
   * Creates a status label which can be used to document component development status.
   */
  export default defineComponent({
    name: 's-status',
    status: 1,

    // components: {},

    props: {
      /**
       * Accepts a state modifier for the component.
       *
       * Valid values: `[0, 1]`
       */
      modifier: {
        type: [Number],
        default: null,
        validator: (value: number) => !!availableStatus[value],
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns a configuration Object for modifier classes.
       */
      modifiers(): IModifiers {
        const modifier = availableStatus[this.modifier];
        const modifiers: IModifiers = {};

        if (modifier) {
          modifiers[modifier.modifier] = true;
        }

        return modifiers;
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
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .s-status {
    /* stylelint-disable color-hex-length, color-named */

    @include mixins.font(12);

    top: 30px;
    z-index: 1;
    padding-right: variables.$spacing--30;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 50%);

    &__inner {
      display: inline-block;
      align-self: flex-end;
      padding: 0 variables.$spacing--10 0 0;
      border-radius: 3px;
      background: crimson;
      color: variables.$color-grayscale--1000;
      font-weight: bold;

      &::before {
        display: inline-block;
        content: 'Status ';
        margin-right: 10px;
        padding: variables.$spacing--5 variables.$spacing--10;
        border-radius: 3px 0 0 3px;
        background: #333;
      }
    }

    &--sticky {
      position: sticky;
      display: flex;
      flex-direction: column;
    }

    &--ready &__inner {
      background: limegreen;
    }
  }
</style>
