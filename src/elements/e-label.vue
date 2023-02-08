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
      <slot></slot>
    </span>
  </component>
</template>

<script>
  import mixinFormStates from '@/mixins/form-states';

  /**
   * Label component for form elements, can be used with a slot or a for attribute
   */
  export default {
    name: 'e-label',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    mixins: [mixinFormStates],

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
        validator(value) {
          return [
            'top',
            'right',
            'bottom',
            'left',
          ].includes(value);
        }
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

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          ...this.mixinStateModifiers,
          position: this.position,
        };
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    beforeMount() {
      /**
       * Setup event handler for "focus" event, which will be sent from the input in the slot
       */
      this.$on('focus', () => {
        this.hasFocus = true;
      });

      /**
       * Setup event handler for "blur" event, which will be sent from the input in the slot
       */
      this.$on('blur', () => {
        this.hasFocus = false;
      });
    },
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},
    // methods: {}
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-label {
    color: variables.$color-grayscale--200;
    display: block;
    cursor: pointer;

    &__inner {
      width: 100%;
    }

    &__name {
      @include mixins.font(variables.$font-size--16, variables.$spacing--20);

      color: inherit;
      display: block;
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
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        margin-right: variables.$spacing--15;
      }
    }

    &--position-right {
      display: flex;
      flex-direction: row-reverse;

      .e-label__name {
        flex: 1 0 auto;
        display: flex;
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
