<template>
  <span :class="b(modifiers)">
    <!-- Search field -->
    <input
      v-if="isOpen && hasSearch"
      v-model="searchTerm"
      ref="searchField"
      :placeholder="$t('e-multiselect.searchFieldPlaceholder')"
      :class="b('search-field')"
      type="text"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    />

    <!-- Trigger Button -->
    <button
      v-else
      ref="fieldWrapper"
      :class="b('field-wrapper', { open: isOpen, disabled: isDisabled })"
      :disabled="isDisabled"
      type="button"
      @click="isOpen = !isOpen"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <span :class="b('output-value')">
        {{ outputValue }}
      </span>
      <e-icon
        v-if="hasDefaultState && !focus"
        :class="b('arrow-icon')"
        icon="i-arrow--down"
        size="22"
        inline
      />
      <e-icon
        v-else-if="stateIcon"
        :class="b('state-icon')"
        :icon="stateIcon"
      />
      <span
        v-if="!hasDefaultState"
        :class="b('icon-splitter')"
      ></span>
      <span :class="b('progress-wrapper')">
        <e-progress v-if="progress" />
      </span>
    </button>

    <!-- Content -->
    <transition name="top-slide">
      <span
        v-show="isOpen"
        v-outside-click="{ excludeRefs: ['fieldWrapper', 'searchField'], handler: close }"
        :class="b('options-wrapper')"
      >
        <ul :class="b('options-list')">
          <li
            v-for="option in filteredOptions"
            :key="option[valueField]"
            :class="b('options-item')"
          >
            <e-checkbox
              v-model="internalValue"
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
  import { PropType, Ref, defineComponent, ref, toRefs } from 'vue';
  import i18n from '@/setup/i18n';
  import useFormStates, { FormStates, withProps } from '@/compositions/form-states';
  import useUuid, { Uuid } from '@/compositions/uuid';
  import eCheckbox from '@/elements/e-checkbox.vue';
  import eIcon from '@/elements/e-icon.vue';
  import eProgress from '@/elements/e-progress.vue';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  type Option = {
    value: string;
    label: string;
    [key: string]: string;
  };

  type Setup = FormStates &
    Uuid & {
      searchField: Ref<HTMLInputElement | null>;
      fieldWrapper: Ref<HTMLButtonElement | null>;
    };

  type Data = {
    isOpen: boolean;
    searchTerm: string;
  };

  /**
   * This renders a multi-select component.
   */
  export default defineComponent({
    name: 'e-multiselect',

    components: {
      eCheckbox,
      eIcon,
      eProgress,
    },

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
        type: Array as PropType<Option[]>,
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

    emits: {
      'update:modelValue': (value: unknown) => value !== undefined,
      'close': (value: unknown) => value !== undefined,
    },

    setup(props): Setup {
      const searchField = ref();
      const fieldWrapper = ref();

      return {
        ...useFormStates(toRefs(props).state),
        ...useUuid(),
        searchField,
        fieldWrapper,
      };
    },

    data(): Data {
      return {
        /**
         * @type {boolean} Holds the internal opening state of the options.
         */
        isOpen: false,

        /**
         * @type {string} Holds the value fo the search input field.
         */
        searchTerm: '',
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {object}   BEM classes
       */
      modifiers(): Modifiers {
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
       * @returns {string}
       */
      selectionAsString(): string {
        if (this.internalValue.length) {
          return this.options
            .filter((option) => {
              const value = option[this.valueField];

              return typeof value !== 'undefined' && this.internalValue.includes(value);
            })
            .map((option) => option[this.labelField])
            .join(', ');
        }

        return '';
      },

      /**
       * Shows if the disabled state of the component should be active.
       *
       * @returns {boolean}
       */
      isDisabled() {
        return this.disabled || this.progress;
      },

      /**
       * Gets the filtered options if the user used the search.
       *
       * @returns {array.<object>}
       */
      filteredOptions(): Option[] {
        if (this.hasSearch && this.searchTerm) {
          return this.options.filter((option) => option[this.labelField]?.includes(this.searchTerm));
        }

        return this.options;
      },
    },
    watch: {
      /**
       * Observes the "isOpen" property and sets the focus on the search field if it's available.
       *
       * @param {boolean} open - The open state.
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
    mounted() {
      window.addEventListener('click', this.onClick, { capture: true });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Checks if the dropdown needs to be closed because of an outside click
       */
      onClick(event: MouseEvent) {
        if (this.$el !== event.target && !this.$el.contains(event.target)) {
          this.close();
        }
      },

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
         * @type {array.<string>}
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

    position: relative;
    display: block;

    &__field-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-height: $e-multiselect-height;
      padding: 0 variables.$spacing--5 0 variables.$spacing--10;
      border: 1px solid variables.$color-grayscale--500;
      border-radius: 3px;
      background-color: variables.$color-grayscale--1000;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      .e-icon {
        transition: transform variables.$transition-duration--200 linear;
      }
    }

    // hover
    &__field-wrapper:hover,
    &--hover &__field-wrapper {
      border-color: variables.$color-grayscale--400;
    }

    &__field-wrapper--open {
      border-color: variables.$color-grayscale--400;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;

      #{$this}__arrow-icon {
        transform: rotate(180deg);
      }

      + #{$this}__options-wrapper {
        border-color: variables.$color-grayscale--400;
      }
    }

    &__field-wrapper--disabled {
      color: variables.$color-grayscale--500;
      pointer-events: none;
    }

    &__output-value {
      flex: 1 0 calc(100% - 20px);
      max-width: calc(100% - 20px);
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__options-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      display: block;
      width: 100%;
      max-height: 300px;
      overflow: auto;
      border: 1px solid variables.$color-grayscale--500;
      border-top: 0;
      background-color: variables.$color-grayscale--1000;
      transform-origin: top;
    }

    &__options-list {
      overflow: hidden; // needed to fix weird dropdown height issue
    }

    &__options-item {
      padding: variables.$spacing--2 variables.$spacing--5;
    }

    &__progress-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    &__search-field {
      width: 100%;
      min-height: $e-multiselect-height;
      padding: 0 variables.$spacing--5;
      outline: none;
      border: 1px solid variables.$color-grayscale--500;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    // separator for state icons
    &__icon-splitter {
      position: absolute;
      top: 2px;
      right: 30px;
      height: calc(100% - 4px);
      border-left: 1px solid;
    }

    // States
    &--state-error {
      #{$this}__field-wrapper {
        @include mixins.icon(error, 22px, right 5px center, false); // FF does not support mask on <select>.

        border-color: variables.$color-status--error;
        color: variables.$color-status--error;

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
      transition: all variables.$transition-duration--200 ease-in-out;
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
