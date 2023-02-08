<template>
  <label :class="b(modifiers)"
         @mouseenter="hasHover = true"
         @mouseleave="hasHover = false"
  >
    <input v-model="internalValue"
           v-bind="$attrs"
           :class="b('field', fieldModifiers)"
           :disabled="disabled"
           :value="value"
           :name="name"
           type="radio"
           @change="onChange"
    >
    <span :class="b('label')">
      <slot></slot>
    </span>
  </label>
</template>

<script>
  import mixinFormStates from '@/mixins/form-states';

  /**
   * Renders a radio element. Use a v-for loop to generate a set of radio buttons.
   *
   * The displayed name can either be provided by the property `displayName` or as a slot.
   */
  export default {
    name: 'e-radio',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    mixins: [mixinFormStates],
    inheritAttrs: false,

    model: {
      /**
       * Changes v-model behavior and use 'selected' instead of 'value' as prop.
       * Avoids conflict with default value attribute.
       */
      prop: 'selected',
      event: 'change',
    },

    props: {
      /**
       * Adds value attribute.
       */
      value: {
        required: true,
        type: [String, Number],
      },

      /**
       * Adds name attribute.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * Adds selected attribute to be used by v-model.
       */
      selected: {
        default: '',
        type: [String, Number],
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Getter/setter for the internal value.
       *
       * @returns {Boolean}
       */
      internalValue: {
        get() {
          return this.selected;
        },
        set(value) {
          /**
           * Fired on select of radio button.
           *
           * @event change
           * @type {String}
           */
          this.$emit('change', value);
        }
      },

      /**
       * Returns a configuration Object for modifier classes.
       *
       * @returns {Object}
       */
      modifiers() {
        return {
          ...this.mixinStateModifiers,
          selected: this.internalValue === this.value,
        };
      },

      /**
       * Returns all modifiers for the field class.
       *
       * @returns {Object}
       */
      fieldModifiers() {
        return {
          selected: this.internalValue === this.value,
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Emits input to parent component.
       *
       * @param   {String}  event   Field input
       */
      onChange(event) {
        /**
         * Emits change event.
         *
         * @event change
         * @type {String}
         */
        this.$emit('change', event.target.value);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-radio {
    $this: &;
    $label-size: 16px;

    @include mixins.font(variables.$font-size--16, 20px);

    position: relative;
    display: block;
    cursor: pointer;

    &__field {
      position: absolute;
      left: -200vw;
      -webkit-appearance: none;
    }

    &__label {
      display: block;
      padding-left: variables.$spacing--25;
      margin: 0;

      &:hover {
        color: variables.$color-grayscale--0;

        &::before {
          border-color: variables.$color-grayscale--0;
        }
      }

      &::before,
      &::after {
        position: absolute;
        content: '';
        top: 3px;
        left: 0;
        width: $label-size;
        height: $label-size;
        border-radius: 50%;
      }

      &::before {
        border: 1px solid variables.$color-grayscale--400;
      }

      &::after {
        transition: transform 0.1s ease-in-out;
        background: variables.$color-grayscale--0;
        opacity: 0;
        transform: scale(0);
      }
    }

    &__field:checked + &__label {
      color: variables.$color-grayscale--0;

      &::after {
        opacity: 1;
        transform: scale(0.6);
      }
    }

    &__field:disabled + &__label {
      color: variables.$color-grayscale--500;
      cursor: default;

      &:hover {
        color: variables.$color-grayscale--500;

        &::before {
          border-color: variables.$color-grayscale--500;
        }
      }

      &::before {
        border-color: variables.$color-grayscale--500;
      }
    }

    &__field:checked:disabled + &__label {
      &::after {
        background: variables.$color-grayscale--500;
      }
    }
  }
</style>
