<template>
  <div :class="b(modifiers)">
    <label :class="b('label')"
           @mouseenter="isHover = true"
           @mouseleave="isHover = false">
      <input :class="b('field')"
             v-bind="$attrs"
             :disabled="disabled"
             :value="value"
             v-model="internalValue"
             :name="name"
             type="radio"
             @change="onChange"
      >
      <span :class="b('fake-button')"></span>
      <span :class="b('label-name')">{{ displayName }}</span>
    </label>
  </div>
</template>

<script>
  import formStates from '@/mixins/form-states';

  /**
   * Renders a radio element. Use a v-for loop to generate a set of radio buttons.
   */
  export default {
    name: 'e-radio',
    // components: {},
    mixins: [formStates],
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
        type: String,
      },

      /**
       * Adds displayed value of the radio element.
       */
      displayName: {
        required: true,
        type: String,
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
        type: String,
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
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

      modifiers() {
        return {
          ...this.stateModifiers,
          selected: this.internalValue === this.value,
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Emits input to parent component
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
        this.$parent.$emit('change', event.target.value);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-radio {
    @include font($font-size--14, 18px);

    position: relative;

    &__field {
      opacity: 0;
      position: absolute;
      left: -9999px;
    }

    &__fake-button::after {
      position: relative;
      content: '';
    }

    &__fake-button {
      -webkit-appearance: none;
      background-color: $color-grayscale--1000;
      border: 1px solid $color-grayscale--400;
      border-radius: 10px;
      display: inline-block;
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    &__label-name {
      padding-left: $spacing--25;
      cursor: pointer;
      color: $color-grayscale--400;
    }

    &__label {
      cursor: pointer;
      margin-bottom: 0;
    }

    &__field:checked ~ &__fake-button::after {
      background-color: var(--theme-color-secondary-2);
      border-radius: 25px;
      content: '';
      display: block;
      height: 10px;
      width: 10px;
      left: 2px;
      top: 2px;
    }

    &__field:checked ~ &__fake-button {
      border: 1px solid var(--theme-color-primary-1);
    }

    &__field:checked ~ &__label-name {
      color: var(--theme-color-secondary-2);
    }

    /* stylelint-disable no-descending-specificity */

    // hover
    &--hover &__fake-button,
    &__field:hover ~ &__fake-button {
      border: 1px solid var(--theme-color-primary-1);
    }

    // focus
    &--focus &__fake-button,
    &__field:focus ~ &__fake-button {
      border: 1px solid var(--theme-color-primary-1);
    }

    // disabled
    &--disabled &__fake-button,
    &__field:disabled ~ &__fake-button {
      border-color: $color-grayscale--500;
      cursor: default;
    }

    &__field:disabled:checked ~ &__fake-button::after {
      background-color: $color-grayscale--500;
    }

    &__field:disabled ~ &__label-name {
      cursor: default;
      color: $color-grayscale--500;
    }

    &--disabled &__label {
      cursor: default;
    }
  }
</style>
