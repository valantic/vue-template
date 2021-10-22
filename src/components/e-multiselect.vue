<template>
  <span :class="b(modifiers)">
    <!-- Search field -->
    <input v-if="isOpen && hasSearch"
           v-model="searchTerm"
           ref="searchField"
           :placeholder="$t('e-multiselect.searchFieldPlaceholder')"
           :class="b('search-field')"
           type="text"
           @mouseenter="hasHover = true"
           @mouseleave="hasHover = false"
    >

    <!-- Trigger Button -->
    <button v-else
            ref="fieldWrapper"
            :class="b('field-wrapper', { open: isOpen, disabled: isDisabled })"
            :disabled="isDisabled"
            type="button"
            @click="isOpen = !isOpen"
            @mouseenter="hasHover = true"
            @mouseleave="hasHover = false"
    >
      <span :class="b('output-value')">
        {{ outputValue }}
      </span>
      <e-icon v-if="hasDefaultState"
              icon="arrow--down"
              size="22"
              inline
      />
      <span v-if="!hasDefaultState" :class="b('icon-splitter')"></span>
      <span :class="b('progress-wrapper')">
        <e-progress v-if="progress" />
      </span>
    </button>

    <!-- Content -->
    <transition name="top-slide">
      <span v-show="isOpen"
            v-outside-click="{ exclude: ['fieldWrapper', 'searchField'], handler: close }"
            :class="b('options-wrapper')"
      >
        <ul :class="b('options-list')">
          <li v-for="option in filteredOptions"
              :key="option[valueField]"
              :class="b('options-item')"
          >
            <e-checkbox v-model="internalValue"
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

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref,
    Ref, toRefs
  } from 'vue';
  import i18n from '@/setup/i18n';
  import useUuid, { IUuid } from '@/compositions/uuid';
  import useFormStates, { IFormStates, withProps } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface IOption {
    value: string;
    label: string;
    [key: string]: string;
  }

  interface ISetup extends IFormStates, IUuid {
    searchField: Ref<HTMLInputElement | null>;
    fieldWrapper: Ref<HTMLButtonElement | null>;
  }

  interface IData {
    isOpen: boolean;
    searchTerm: string;
  }

  /**
   * This renders a multi-select component.
   */
  export default defineComponent({
    name: 'e-multiselect',
    // components: {},

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
        default: () => [],
        type: Array as PropType<string[]>,
      },

      /**
       * Defines the available options to select.
       *
       * e.g. `[{ <valueField>: 'id1', <labelField>: 'Label 1' },{ <valueField>: 'id2', <labelField>: 'Label 2' },...]`
       */
      options: {
        required: true,
        type: Array as PropType<IOption[]>,
      },

      /**
       * The text to display if no option is selected by default.
       * The placeholder can also be disabled by passing 'false' to this prop.
       */
      placeholder: {
        type: [String, Boolean],
        default: i18n.global.t('e-multiselect.defaultPlaceholder'),
        validator: (value: string | boolean) => typeof value === 'string' || !value,
      },

      /**
       * Defines if the component should have a search field.
       */
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

    emits: ['update:modelValue', 'close'],

    setup(props): ISetup {
      const searchField = ref();
      const fieldWrapper = ref();

      const { increaseUuid } = useUuid();

      increaseUuid();

      return {
        ...useFormStates(toRefs(props).state),
        ...useUuid(),
        searchField,
        fieldWrapper,
      };
    },

    data(): IData {
      return {
        /**
         * @type {Boolean} Holds the internal opening state of the options.
         */
        isOpen: false,

        /**
         * @type {String} Holds the value fo the search input field.
         */
        searchTerm: '',
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
        };
      },

      /**
       * V-model handler for the checkboxes (options).
       */
      internalValue: {
        get(): string[] {
          return this.modelValue;
        },
        set(value: string[]) {
          /**
           * Emits checkbox value e.g. true/false or value
           */
          this.$emit('update:modelValue', value);
        },
      },

      /**
       * Gets the current output value which is either the selected options or a placeholder text if available.
       */
      outputValue(): string {
        return this.selectionAsString || (typeof this.placeholder === 'string' ? this.placeholder : '');
      },

      /**
       * Gets a combined string of all the currently selected labels.
       *
       * @returns {String}
       */
      selectionAsString(): string {
        if (this.internalValue.length) {
          return this.options
            .filter(option => this.internalValue.includes(option[this.valueField]))
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

      /**
       * Gets the filtered options if the user used the search.
       *
       * @returns {Array.<Object>}
       */
      filteredOptions(): IOption[] {
        if (this.hasSearch && this.searchTerm) {
          return this.options.filter(option => option[this.labelField].includes(this.searchTerm));
        }

        return this.options;
      },
    },
    watch: {
      /**
       * Observes the "isOpen" property and sets the focus on the search field if it's available.
       *
       * @param {Boolean} open - The open state.
       */
      isOpen(open) {
        if (this.hasSearch && open) {
          this.$nextTick(() => {
            this.searchField?.focus();
          });
        }
      },
    },

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
        this.searchTerm = '';

        /**
         * Emits the closing event to the parent.
         *
         * @event close
         * @type {Array.<String>}
         */
        this.$emit('close', this.internalValue);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .e-multiselect {
    $this: &;
    $e-multiselect-height: 30px;

    display: block;
    position: relative;

    &__field-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: 1px solid variables.$color-grayscale--500;
      min-height: $e-multiselect-height;
      padding: 0 variables.$spacing--5 0 variables.$spacing--10;
      cursor: pointer;
      background-color: variables.$color-grayscale--1000;
      border-radius: 3px;

      &:focus {
        outline: none;
      }

      .e-icon {
        transition: transform variables.$transition-duration-200 linear;
      }
    }

    // hover
    &__field-wrapper:hover,
    &--hover &__field-wrapper {
      border-color: variables.$color-grayscale--400;
    }

    &__field-wrapper--open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-color: variables.$color-grayscale--400;

      .e-icon {
        transform: rotate(180deg);
      }

      + #{$this}__options-wrapper {
        border-color: variables.$color-grayscale--400;
      }
    }

    &__field-wrapper--disabled {
      pointer-events: none;
      color: variables.$color-grayscale--500;
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
      border: 1px solid variables.$color-grayscale--500;
      border-top: 0;
      position: absolute;
      width: 100%;
      top: 100%;
      left: 0;
      background-color: variables.$color-grayscale--1000;
      max-height: 300px;
      overflow: auto;
      transform-origin: top;
      z-index: 1;
    }

    &__options-list {
      overflow: hidden; // needed to fix weird dropdown height issue
    }

    &__options-item {
      padding: variables.$spacing--2 variables.$spacing--5;
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

    &__search-field {
      width: 100%;
      min-height: $e-multiselect-height;
      border: 1px solid variables.$color-grayscale--500;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      outline: none;
      padding: 0 variables.$spacing--5;
    }

    // separator for state icons
    &__icon-splitter {
      position: absolute;
      right: 30px;
      height: calc(100% - 4px);
      top: 2px;
      border-left: 1px solid;
    }

    // States
    &--state-error {
      #{$this}__field-wrapper {
        @include mixins.icon(error, 22px, right 5px center, false); // FF does not support mask on <select>.

        border-color: variables.$color-status--error;

        &:hover {
          border-color: variables.$color-status--error;
        }

        &:focus {
          border: 1px solid variables.$color-status--error;
        }
      }

      #{$this}__icon-splitter {
        border-color: variables.$color-status--error;
      }
    }

    &--state-success {
      #{$this}__field-wrapper {
        @include mixins.icon(check, 22px, right 5px center, false); // FF does not support mask on <select>.
      }

      #{$this}__icon-splitter {
        display: none;
      }
    }

    // Transition
    .top-slide-enter-active,
    .top-slide-leave-active {
      transition: all variables.$transition-duration-200 ease-in-out;
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
