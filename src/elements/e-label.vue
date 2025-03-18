<template>
  <component
    :is="tag"
    :class="b(modifiers)"
  >
    <span :class="b('name', { invisible })">
      <template v-if="$slots.name">
        <slot name="name"></slot>
      </template>
      <template v-else> {{ name }}{{ required ? '*' : '' }} </template>
    </span>
    <component
      v-if="$slots.default"
      :is="tag === 'label' ? 'span' : tag"
      :class="b('inner')"
    >
      <!-- @slot Label content -->
      <slot></slot>
    </component>
  </component>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '@/compositions/form-states';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  /**
   * Label component for form elements, can be used with a slot or a for attribute
   */
  export default defineComponent({
    name: 'e-label',

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
        validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value),
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

    setup(props): FormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    // data(): Data {
    //   return {};
    // },

    computed: {
      /**
       * Defines state modifier classes.
       */
      modifiers(): Modifiers {
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
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .e-label {
    display: block;
    color: var(--theme-color-grayscale-200);

    &__inner {
      width: 100%;
    }

    &__name {
      @include mixins.font(variables.$va-font-size--16, variables.$va-spacing--20);

      display: block;
      color: inherit;
    }

    &__name--invisible {
      @include mixins.invisible();
    }

    &--position-top {
      .e-label__name {
        margin-bottom: variables.$va-spacing--5;
      }
    }

    &--position-bottom {
      display: flex;
      flex-direction: column-reverse;

      .e-label__name {
        margin-top: variables.$va-spacing--5;
      }

      .e-label__inner {
        flex-shrink: 0; // fixes height bug on E11
      }
    }

    &--position-left {
      display: flex;

      .e-label__name {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        margin-right: variables.$va-spacing--15;
      }
    }

    &--position-right {
      display: flex;
      flex-direction: row-reverse;

      .e-label__name {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        margin-left: variables.$va-spacing--15;
      }
    }

    &--active {
      color: var(--theme-color-secondary--1);
    }

    &--disabled {
      color: var(--theme-color-grayscale-300);
    }

    &--state-error {
      color: var(--theme-color-status--error);
    }
  }
</style>
