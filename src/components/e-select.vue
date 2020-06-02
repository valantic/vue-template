<template>
  <div :class="b(stateModifiers)">
    <select :value="value"
            :class="b('select')"
            :disabled="disabled || progress"
            v-bind="$attrs"
            @change="onChange"
    >
      <option v-if="placeholder"
              :disabled="!hasSelectablePlaceholder"
              value=""
      >
        {{ placeholder }}
      </option>
      <option v-for="option in options"
              :key="`${option[valueField]}`"
              :value="option[valueField]"
              :selected="option[valueField] === value">
        {{ option[labelField] }}
      </option>
    </select>
    <span v-if="!hasDefaultState" :class="b('icon-splitter')"></span>
    <div v-if="progress" :class="b('progress-container')">
      <e-progress />
    </div>
  </div>
</template>

<script>
  import { i18n } from '@/setup/i18n';
  import formStates from '../mixins/form-states';

  /**
   * Renders a styled select element. Options can be passed with the `options` property.
   */
  export default {
    name: 'e-select',
    status: 0,

    // components: {},
    mixins: [formStates],
    inheritAttrs: false,

    props: {
      /**
       * Value for vue model binding.
       */
      value: {
        default: null,
        type: [String, Number],
      },

      /**
       * Name is used to generate a unique key in vue.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * 'options' defines the options which are rendered in the select.
       *
       * e.g. `[{ <valueField>: 'id1', <labelField>: 'Label 1' },{ <valueField>: 'id2', <labelField>: 'Label 2' },...]`
       */
      options: {
        required: true,
        type: Array,
      },

      /**
       * The text to display if no option is selected by default.
       * The placeholder can also be disabled by passing 'false' to this prop.
       */
      placeholder: {
        type: [String, Boolean],
        default: i18n.t('e-select.chooseOption'),
        validator(value) {
          return typeof value === 'string' || value === false;
        },
      },

      /**
       * Defines if the placeholder text is selectable to reset the select (empty value).
       */
      hasSelectablePlaceholder: {
        type: Boolean,
        default: false,
      },

      /**
       * Shows a progress bar.
       */
      progress: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to change the default field, from which the value is taken for each option.
       */
      valueField: {
        type: String,
        default: 'value',
      },

      /**
       * Allows to change the default field, from which the label text is taken for each option.
       */
      labelField: {
        type: String,
        default: 'label',
      },
    },
    // data() {
    //   return {};
    // },

    // computed: {},
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
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  $this: &;
  $e-select-height: 30px;

  .e-select {
    position: relative;

    &__select {
      @include font($font-size--14, 18px);

      background: url('../assets/icons/i-arrow--down--info.svg') no-repeat right 5px center;
      border: 1px solid $color-grayscale--500;
      border-radius: 3px;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      color: $color-grayscale--400;
      outline: none;
      padding: $spacing--0 $spacing--30 $spacing--0 $spacing--10;
      height: $e-select-height;

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
      border-color: $color-grayscale--600;
      color: $color-grayscale--600;
      background-image: url('../assets/icons/i-arrow--down--disabled.svg');
    }

    /**
     * states
     */
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      #{$this}__select {
        @include form-state-icon('error');

        border-color: $color-status--danger;
      }

      #{$this}__icon-splitter {
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
      #{$this}__select {
        @include form-state-icon('success');
      }

      #{$this}__icon-splitter {
        display: none;
      }
    }

    &__progress-container {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
