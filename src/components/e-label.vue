<template>
  <component :is="tag" :class="b(modifiers)">
    <span :class="b('name', { invisible })">
      <template v-if="$slots.name">
        <slot name="name"></slot>
      </template>
      <template v-else>
        {{ name }}{{ required ? '*' : '' }}
      </template>
    </span>
    <span v-if="$slots.default" :class="b('inner')">
      <!-- @slot Label content -->
      <slot @focus="focus = true" @blur="focus = false"></slot>
    </span>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useFormStates, { IFormStates } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface ISetup extends IFormStates {}

  /**
   * Label component for form elements, can be used with a slot or a for attribute
   */

  export default defineComponent({
    name: 'e-label',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},

    props: {
      /**
       * Displayed tag.
       */
      tag: {
        type: String,
        default: 'label'
      },

      /**
       * Displayed name of the label
       */
      name: {
        type: String,
        required: true
      },

      /**
       * Position of the label ("top", "right", "bottom", "left")
       */
      position: {
        type: String,
        default: 'top',
        validator: (value: string) => [
          'top',
          'right',
          'bottom',
          'left',
        ].includes(value)
      },

      /**
       * Hides the label-text for the normal user (only available for screen readers).
       */
      invisible: {
        type: Boolean,
        default: false,
      },

      /**
       * Adds an optional required marker "*".
       */
      required: {
        type: Boolean,
        default: false,
      },
    },

    setup(): ISetup {
      return {
        ...useFormStates(),
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
          position: this.position,
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
    // beforeUnmount() {},
    // unmounted() {},
    // methods: {}
    // render() {},
  });
</script>

<style lang="scss">
  .e-label {
    color: $color-grayscale--400;
    display: block;

    &__inner {
      width: 100%;
    }

    &__name {
      @include font($font-size--16, $spacing--20);

      color: inherit;
      display: block;
    }

    &__name--invisible {
      position: absolute;
      overflow: hidden;
      height: 0;
      width: 0;
      top: 0;
    }

    &--position-top {
      .e-label__name {
        margin-bottom: $spacing--5;
      }
    }

    &--position-bottom {
      display: flex;
      flex-direction: column-reverse;

      .e-label__name {
        margin-top: $spacing--5;
      }

      .e-label__inner {
        flex-shrink: 0; // fixes height bug on IE11
      }
    }

    &--position-left {
      display: flex;

      .e-label__name {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        margin-right: $spacing--15;
      }
    }

    &--position-right {
      display: flex;
      flex-direction: row-reverse;

      .e-label__name {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        margin-left: $spacing--15;
      }
    }

    &--active,
    &--focus {
      color: $color-secondary--1;
    }

    &--disabled {
      color: $color-grayscale--300;
    }

    &--state-error {
      color: $color-status--danger;
    }
  }
</style>
