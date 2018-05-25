<template>
  <label :class="b(modifiers)">
    <span :class="b('name')">{{ name }}</span>
    <span v-if="this.$slots.default" :class="b('inner')">
      <!-- @slot Label content -->
      <slot></slot>
    </span>
  </label>
</template>

<script>
  import formStates from '../mixins/form-states';

  /**
   * Label component for form elements, can be used with a slot or a for attribute
   */
  export default {
    name: 'e-label',
    // components: {},
    mixins: [formStates],

    props: {
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
      }
    },

    computed: {
      /**
       * Defines state modifier classes
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          ...this.stateModifiers,
          position: this.$props.position
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
  .e-label {
    display: block;
    margin: 0;
    color: $color-grayscale--400;

    &__inner {
      width: 100%;
    }

    &__name {
      @include font($font-size--16, $spacing--20);

      color: inherit;
      display: block;
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
      color: $color-grayscale--500;
    }

    &--state-error {
      color: $color-status--danger;
    }
  }
</style>
