<template>
  <span :class="b(modifiers)">
    <select :value="value"
            :class="b('select')"
            :disabled="disabled || progress"
            v-bind="$attrs"
            @change="onChange"
            @mouseenter="mixinHasHover = true"
            @mouseleave="mixinHasHover = false"
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
    <span :class="b('icon-wrapper')">
      <span v-if="!mixinHasDefaultState" :class="b('icon-splitter')"></span>
      <e-icon v-if="!mixinHasDefaultState && !focus"
              :class="b('state-icon')"
              :icon="mixinStateIcon"
      />
      <span v-if="progress" :class="b('progress-container')">
        <e-progress />
      </span>
    </span>
  </span>
</template>

<script>
  import { i18n } from '@/setup/i18n';
  import mixinFormStates from '@/mixins/form-states';
  import eIcon from '@/elements/e-icon.vue';
  import eProgress from '@/elements/e-progress.vue';

  /**
   * Renders a styled select element. Options can be passed with the `options` property.
   */
  export default {
    name: 'e-select',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eIcon,
      eProgress
    },

    mixins: [mixinFormStates],
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

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          ...this.mixinStateModifiers,
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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  $e-select-height: 30px;

  .e-select {
    $this: &;
    $height: 30px;

    display: block;
    position: relative;

    &__select {
      @include mixins.icon(arrow--down, 22px, right 5px center, $mask: false); // FF does not support mask on <select>.

      border: 1px solid variables.$color-grayscale--500;
      border-radius: 3px;
      width: 100%;
      appearance: none;
      outline: none;
      padding: variables.$spacing--0 variables.$spacing--30 variables.$spacing--0 variables.$spacing--10;
      height: $height;
      cursor: pointer;
      color: variables.$color-grayscale--200;

      &::-ms-expand {
        display: none;
      }
    }

    .e-icon {
      display: flex;
      margin: auto;
    }
    // separator for state icons
    &__icon-wrapper {
      position: absolute;
      top: 50%;
      right: variables.$spacing--5;
      display: flex;
      transform: translateY(-50%);
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
      border: 1px solid variables.$color-grayscale--400;
    }

    // focus
    &__select:focus,
    &--focus &__select {
      outline: none;
    }

    // disabled
    &__select:disabled,
    &--disabled &__select,
    &--disabled &__select:hover {
      border-color: variables.$color-grayscale--600;
      color: variables.$color-grayscale--600;
    }

    /**
     * states
     */
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      color: variables.$color-status--error;

      #{$this}__select {
        @include mixins.icon(error, 22px, right 5px center, false); // FF does not support mask on <select>.

        color: variables.$color-status--error;
        border-color: variables.$color-status--error;
      }

      #{$this}__icon-splitter {
        border-color: variables.$color-status--error;
      }
    }

    &--state-error &__select:hover {
      border-color: variables.$color-status--error;
    }

    &--state-error &__select:focus {
      border: 1px solid variables.$color-status--error;
    }

    &--state-success {
      #{$this}__select {
        @include mixins.icon(check, 22px, right 5px center, false); // FF does not support mask on <select>.
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
