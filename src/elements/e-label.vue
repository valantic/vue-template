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
  import { defineComponent, toRefs } from 'vue';
  import useFormStates, { IFormStates, withProps } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  /**
   * Label component for form elements, can be used with a slot or a for attribute
   */
  export default defineComponent({
    name: 'e-label',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},

    props: {
      ...withProps(),

      /**
       * Displayed tag.
       */
      tag: {
        type: String,
        default: 'label',
      },

      /**
       * Displayed name of the label
       */
      name: {
        type: String,
        required: true,
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
        ].includes(value),
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

    setup(props): IFormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
          position: this.position,
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
    // methods: {}
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-label {
    display: block;
    cursor: pointer;
    color: variables.$color-grayscale--200;

    &__inner {
      width: 100%;
    }

    &__name {
      @include mixins.font(variables.$font-size--16, variables.$spacing--20);

      display: block;
      color: inherit;
    }

    &__name--invisible {
      @include mixins.invisible();
    }

    &--position-top {
      .e-label__name {
        margin-bottom: variables.$spacing--5;
      }
    }

    &--position-bottom {
      display: flex;
      flex-direction: column-reverse;

      .e-label__name {
        margin-top: variables.$spacing--5;
      }

      .e-label__inner {
        flex-shrink: 0; // fixes height bug on IE11
      }
    }

    &--position-left {
      display: flex;

      .e-label__name {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        margin-right: variables.$spacing--15;
      }
    }

    &--position-right {
      display: flex;
      flex-direction: row-reverse;

      .e-label__name {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        margin-left: variables.$spacing--15;
      }
    }

    &--active,
    &--focus {
      color: variables.$color-secondary--1;
    }

    &--disabled {
      color: variables.$color-grayscale--300;
    }

    &--state-error {
      color: variables.$color-status--error;
    }
  }
</style>
