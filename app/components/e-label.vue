<template>
  <label :class="b(modifiers)" :form="formId" :for="forId">
    <span :class="b('name')">{{ name }}</span>
    <span v-if="!forId" :class="b('inner')">
      <slot></slot>
    </span>
  </label>
</template>

<script>
  import formStates from '@/mixins/formStates';

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
      },

      /**
       * Labels «form» attribute for place the label outside a form
       */
      formId: {
        type: String,
        default: null
      },

      /**
       * Labels «for» attribute for referencing a form-element outside the slot
       */
      forId: {
        type: String,
        default: null
      }
    },

    data() {
      return {
        hasFocus: this.$props.focus
      };
    },

    computed: {
      /**
       * Defines state modifier classes
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return Object.assign(this.defaultModifiers, {
          position: this.position
        });
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    beforeMount() {
      this.$on('focus', (state) => {
        this.hasFocus = state;
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
  // TODO: Mixin properties not visible in styleguide
</script>

<style lang="scss">
  .e-label {
    width: 100%;
    margin: 0;

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

    &--state-default {
      color: $color-grayscale--400;
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
