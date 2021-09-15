<template>
  <span :class="b()">
    <!-- Field -->
    <button ref="fieldWrapper"
            :class="b('field-wrapper', { open: isOpen, disabled: isDisabled })"
            :disabled="isDisabled"
            type="button"
            @click="isOpen = !isOpen"
    >
      <span :class="b('output-value')">
        {{ outputValue }}
      </span>
      <e-icon icon="arrow--down"
              width="15"
              height="15"
              inline
      />
      <span :class="b('progress-wrapper')">
        <e-progress v-if="progress" />
      </span>
    </button>

    <!-- Content -->
    <transition name="top-slide">
      <span v-show="isOpen"
            v-outside-click="{ exclude: ['fieldWrapper'], handler: close }"
            :class="b('options-wrapper')"
      >
        <ul :class="b('options-list')">
          <li v-for="option in options"
              :key="option[valueField]"
              :class="b('options-item')"
          >
            <e-checkbox v-model="dynamicValue"
                        :value="option[valueField]"
                        :name="`e-multiselect--${uuid}`"
            >
              {{ option[labelField] }}
            </e-checkbox>
          </li>
        </ul>
      </span>
    </transition>
  </span>
</template>

<script>
  import { i18n } from '@/setup/i18n';
  import uuid from '@/mixins/uuid';

  /**
   * This renders a multi-select component.
   */
  export default {
    name: 'e-multiselect',
    // components: {},
    mixins: [
      uuid,
    ],

    /**
     * V-model definitions.
     */
    model: {
      prop: 'value',
      event: 'change',
    },

    props: {
      /**
       * Value for vue model binding.
       */
      value: {
        default: () => [],
        type: Array,
      },

      /**
       * Defines the available options to select.
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
        default: i18n.t('e-multiselect.defaultPlaceholder'),
        validator(value) {
          return typeof value === 'string' || value === false;
        },
      },

      /**
       * Defines if the component should have a search field.
       */
      // eslint-disable-next-line vue/no-unused-properties
      hasSearch: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines if the component should be in disabled mode.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Shows a progress loader in the component.
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
    data() {
      return {
        /**
         * @type {Boolean} Holds the internal opening state of the options.
         */
        isOpen: false,
      };
    },

    computed: {
      /**
       * V-model handler for the checkboxes (options).
       *
       * @returns {Array.<String>}
       */
      dynamicValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('change', value);
        },
      },

      /**
       * Gets the current output value which is either the selected options or a placeholder text if available.
       *
       * @returns {String}
       */
      outputValue() {
        return this.selectionAsString || this.placeholder || '';
      },

      /**
       * Gets a combined string of all the currently selected labels.
       *
       * @returns {String}
       */
      selectionAsString() {
        if (this.dynamicValue.length) {
          return this.options
            .filter(option => this.dynamicValue.includes(option[this.valueField]))
            .map(option => option[this.labelField])
            .join(', ');
        }

        return '';
      },

      /**
       * Shows if the disabled state of the component should be active.
       *
       * @returns {Boolean}
       */
      isDisabled() {
        return this.disabled || this.progress;
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
       * Close options event handler.
       */
      close() {
        if (this.disabled) {
          return;
        }

        this.isOpen = false;

        /**
         * Emits the closing event to the parent.
         *
         * @event close
         * @type {Array.<String>}
         */
        this.$emit('close', this.dynamicValue);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-multiselect {
    $e-multiselect-height: 30px;

    display: block;
    position: relative;

    &__field-wrapper {
      @extend %button-reset;

      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: 1px solid $color-grayscale--500;
      min-height: $e-multiselect-height;
      padding: 0 $spacing--5;
      cursor: pointer;

      .e-icon {
        transition: transform $transition-duration-200 linear;
      }
    }

    &__field-wrapper--open {
      .e-icon {
        transform: rotate(180deg);
      }
    }

    &__field-wrapper--disabled {
      pointer-events: none;
      color: $color-grayscale--500;
    }

    &__output-value {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: calc(100% - 20px);
      max-width: calc(100% - 20px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }

    &__options-wrapper {
      display: block;
      border: 1px solid $color-grayscale--500;
      border-top: 0;
      position: absolute;
      width: 100%;
      top: 100%;
      left: 0;
      background-color: $color-grayscale--1000;
      max-height: 300px;
      overflow: auto;
      transform-origin: top;
    }

    &__options-list {
      @extend %list-reset;
    }

    &__options-item {
      padding: $spacing--2 $spacing--5;
    }

    &__progress-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    // Transition
    .top-slide-enter-active,
    .top-slide-leave-active {
      transition: all $transition-duration-200 ease-in-out;
    }

    .top-slide-enter,
    .top-slide-leave-to {
      opacity: 0;
      transform: scaleY(0);
    }

    .top-slide-enter-to,
    .top-slide-leave {
      opacity: 1;
      transform: scaleY(1);
    }
  }
</style>
