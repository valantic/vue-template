<template>
  <span :class="b(modifiers)">
    <textarea
      :class="b('field', fieldModifiers)"
      :name="name"
      :rows="rows"
      :value="value"
      v-bind="$attrs"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    >
    </textarea>
    <span
      v-if="!hasDefaultState && !focus && stateIcon"
      :class="b('icon-wrapper')"
    >
      <span :class="b('icon-splitter')"></span>
      <e-icon
        :class="b('state-icon')"
        :icon="stateIcon"
      />
    </span>
    <div
      v-if="notification && focus"
      :class="b('notification')"
    >
      <c-form-notification :state="state">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="notification"></span>
      </c-form-notification>
    </div>
  </span>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import cFormNotification from '@/components/c-form-notification.vue';
  import useFormStates, { FormStates, withProps } from '@/compositions/form-states';
  import eIcon from '@/elements/e-icon.vue';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  /**
   * Renders a styled `<textarea>` element which supports the default form state-types.
   * The height can be set by the `rows` property.
   *
   * **WARNING: uses 'v-html' for the 'notification'. Make sure, that the source for this data is trustworthy.**
   */
  export default defineComponent({
    name: 'e-textarea',

    components: {
      eIcon,
      cFormNotification,
    },
    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      value: {
        default: null,
        type: String,
      },

      /**
       * Adds name attribute
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * Adds a notification block in a state container below the textarea
       */
      notification: {
        type: String,
        default: null,
      },

      /**
       * Defines the height of the textarea field.
       */
      rows: {
        type: Number,
        default: 3,
      },

      /**
       * Defines if the textarea is resizable.
       */
      isResizable: {
        type: Boolean,
        default: false,
      },
    },

    emits: {
      input: (value: string): boolean => typeof value === 'string',
      focus: (): boolean => true,
      blur: (): boolean => true,
    },

    setup(props): FormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Defines state modifier classes.
       */
      modifiers(): Modifiers {
        return {
          ...this.stateModifiers,
          notification: !!(this.notification && this.focus),
        };
      },

      /**
       * Returns all modifiers for the field class.
       */
      fieldModifiers(): Modifiers {
        return {
          isResizable: this.isResizable,
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Emits input to parent component.
       */
      onInput(event: Event) {
        const textArea = event.currentTarget as HTMLTextAreaElement;

        this.$emit('input', textArea.value);
      },

      /**
       * Emits focus to parent and wrapper component. This is needed for e.g. setting the focus on the label as well.
       * Updates "hasFocus" state.
       */
      onFocus() {
        this.focus = true;

        this.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component. This is needed for e.g. removing the focus on the label as well.
       * Updates "hasFocus" state.
       */
      onBlur() {
        this.focus = false;

        this.$emit('blur');
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-textarea {
    position: relative;
    display: block;

    &__field {
      position: relative;
      display: block;
      width: 100%;
      padding: variables.$spacing--5 variables.$spacing--10;
      border: 1px solid variables.$color-grayscale--500;
      border-radius: 3px;

      // disable iPhone styling
      -webkit-appearance: none;
      resize: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    &__field--is-resizable {
      resize: both;
    }

    // placeholder
    // placeholder (has to be split in seperate blocks to work on each browser)
    &__field::-webkit-input-placeholder {
      // WebKit, Blink, Edge
      opacity: 1;
      color: variables.$color-grayscale--400;
      font-family: variables.$font-family--primary;
    }

    &__field:-moz-placeholder {
      // Mozilla Firefox 4 to 18
      opacity: 1;
      color: variables.$color-grayscale--400;
      font-family: variables.$font-family--primary;
    }

    &__field::placeholder {
      // Most modern browsers support this now
      opacity: 1;
      color: variables.$color-grayscale--400;
      font-family: variables.$font-family--primary;
    }

    // separator for state icons
    &__icon-splitter {
      position: absolute;
      top: 2px;
      right: 25px;
      height: calc(100% - 4px);
      border-left: 1px solid;
    }

    // notification below field
    &__notification {
      @include mixins.z-index(form-notification);

      position: absolute;
      width: 100%;
      margin-top: -1px;
    }

    &__icon-wrapper {
      position: absolute;
      top: 50%;
      right: variables.$spacing--5;
      display: flex;
      height: 100%;
      transform: translateY(-50%);

      .e-icon {
        align-self: center;
      }
    }

    // active
    &__field:active,
    &--active &__field {
      border: 1px solid variables.$color-grayscale--400;
    }

    // focus
    &__field:focus,
    &--focus &__field {
      outline: none;
      border: 1px solid variables.$color-grayscale--400;
    }

    // hover
    &__field:hover,
    &--hover &__field {
      border: 1px solid variables.$color-grayscale--400;
    }

    // disabled
    &__field:disabled,
    &--disabled &__field,
    &--disabled &__field:hover {
      border: 1px solid variables.$color-grayscale--600;
      background-color: variables.$color-grayscale--1000;
      color: variables.$color-grayscale--400;

      &::placeholder {
        color: variables.$color-grayscale--400;
      }
    }

    /**
     * states
     */
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      .e-textarea__icon-splitter {
        border-color: variables.$color-status--error;
      }
    }

    &--state-error &__field:hover,
    &--state-error &__field {
      border-color: variables.$color-status--error;
    }

    &--state-error &__field:focus {
      border-color: variables.$color-status--error;
    }

    &--state-info {
      .e-textarea__icon-splitter {
        border-color: variables.$color-grayscale--500;
      }
    }

    &--state-success {
      .e-textarea__icon-splitter {
        display: none;
      }
    }

    &--state-success &__field:hover,
    &--state-success &__field {
      border-color: variables.$color-status--success;
    }

    /*
     * Remove icon in background if notification is visible
     */
    &--notification {
      .e-textarea__field {
        padding: variables.$spacing--5 variables.$spacing--10;
        background: none;
      }
    }
  }
</style>
