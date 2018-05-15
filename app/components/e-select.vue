<template>
  <div :class="b(modifiers)">
    <select :value="value"
            :class="b('select')"
            :disabled="disabled"
            v-bind="$attrs"
            @change="onChange"
    >
      <option disabled value="">{{ selectText }}</option>
      <option v-for="item in optionsList" :key="name + '-' + item.value" :value="item.value">{{ item.label }}</option>
    </select>
    <span v-if="!hasDefaultState" :class="b('icon-splitter')"></span>
  </div>
</template>

<script>
  import formStates from '@/mixins/form-states';

  /**
   * Renders a styled select element. Options can be passed with the `optionsList` property.
   */
  export default {
    name: 'e-select',
    // components: {},
    mixins: [formStates],
    inheritAttrs: false,

    props: {
      /**
       * Value for vue model binding.
       */
      value: {
        required: true,
        type: String,
      },

      /**
       * Name is used to generate a unique key in vue.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * OptionsList defines the options which are rendered in the select.
       *
       * e.g. `[{ value: <option-1>, label: <Option 1> },{ value: <option-2>, label: <Option 2>},...]`
       */
      optionsList: {
        required: true,
        type: Array,
      },

      /**
       * The text to display if no option is selected by default.
       */
      selectText: {
        default: 'Please choose...',
        type: String,
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Defines state modifier classes
       *
       * @returns {Object} BEM classes
       */
      modifiers() {
        return {
          ...this.stateModifiers,
        };
      },

      /**
       * Checks if the component is in default state.
       *
       * @returns {Boolean}
       */
      hasDefaultState() {
        return this.state === 'default';
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
       * Emits input event for v-model.
       *
       * @param   {Object}  event   Event object by onchange
       */
      onChange(event) {
        /**
         * Input event for v-model.
         *
         * @event input
         * @type {String}
         */
        this.$emit('input', event.currentTarget.value);
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-select {
    @include half-border($color-grayscale--500);

    &::before,
    &::after {
      pointer-events: none;
    }

    &__select {
      background: url('../assets/icons/i-arrow--down--info.svg') no-repeat right 5px center;
      border: 1px solid transparent;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      color: $color-grayscale--400;
      outline: none;
      padding: 5px 30px 5px 10px;

      &::-ms-expand {
        display: none;
      }
    }

    // separator for state icons
    &__icon-splitter {
      position: absolute;
      right: 30px;
      height: calc(100% - 4px);
      top: 2px;
      border-left: 1px solid;
    }

    // hover
    &__select:hover,
    &--hover &__select {
      border: 1px solid $color-grayscale--500;
    }

    // focus
    &__select:focus,
    &--focus &__select {
      outline: none;
      box-shadow: 0 2px 5px 0 rgba($color-grayscale--400, 0.5);
      border: 1px solid $color-grayscale--500;
    }

    // disabled
    &__select:disabled,
    &--disabled &__select,
    &--disabled &__select:hover {
      border: none;
      color: $color-grayscale--600;
      background-image: url('../assets/icons/i-arrow--down--disabled.svg');
    }

    &--disabled::before,
    &--disabled::after {
      border-color: $color-grayscale--600;
    }

    /**
     * states
     */
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      @include half-border($color-status--danger);

      .e-select__select {
        @include form-state-icon('error');
      }

      .e-select__icon-splitter {
        border-color: $color-status--danger;
      }
    }

    &--state-error &__select:hover {
      border-color: $color-status--danger;
    }

    &--state-error &__select:focus {
      border: 1px solid $color-status--danger;
    }

    &--state-success {
      .e-select__select {
        @include form-state-icon('success');
      }

      .e-select__icon-splitter {
        display: none;
      }
    }
  }
</style>
