<template>
  <span :class="b(modifiers)">
    <textarea :class="b('field', fieldModifiers)"
              :name="name"
              :disabled="disabled"
              :rows="rows"
              :value="value"
              v-bind="$attrs"
              @focus="onFocus"
              @blur="onBlur"
              @input="onInput">
    </textarea>
    <span v-if="!hasDefaultState && !focus" :class="b('icon-wrapper')">
      <span :class="b('icon-splitter')"></span>
      <e-icon :class="b('state-icon')"
              :icon="stateIcon" />
    </span>
    <div v-if="notification && focus" :class="b('notification')">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <c-form-notification v-html="notification" :state="state" />
    </div>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cFormNotification from '@/components/c-form-notification.vue';
  import useFormStates, { IFormStates } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface ISetup extends IFormStates {}

  /**
   * Renders a styled `<textarea>` element which supports the default form state-types.
   * The height can be set by the `rows` property.
   *
   * **WARNING: uses 'v-html' for the 'notification'. Make sure, that the source for this data is trustworthy.**
   */
  export default defineComponent({
    name: 'e-textarea',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cFormNotification,
    },
    inheritAttrs: false,

    props: {
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
      }
    },

    setup(): ISetup {
      return {
        ...useFormStates(),
      };
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
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
          notification: this.$props.notification && this.focus,
        };
      },

      /**
       * Returns all modifiers for the field class.
       *
       * @returns {Object}
       */
      fieldModifiers(): IModifiers {
        return {
          isResizable: this.isResizable,
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Emits input to parent component.
       *
       * @param   {String}  event   Field input
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
  .e-textarea {
    display: block;
    position: relative;

    &__field {
      padding: $spacing--5 $spacing--10;
      resize: none;
      width: 100%;
      border-radius: 3px;
      border: 1px solid $color-grayscale--500;
      display: block;
      position: relative;

      // disable iPhone styling
      -webkit-appearance: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    &__field--is-resizable {
      resize: both;
    }

    // placeholder
    &__field::placeholder {
      color: $color-grayscale--400;
      opacity: 1;
    }

    // separator for state icons
    &__icon-splitter {
      position: absolute;
      right: 25px;
      height: calc(100% - 4px);
      top: 2px;
      border-left: 1px solid;
    }

    // notification below field
    &__notification {
      @include z-index(form-notification);

      position: absolute;
      width: 100%;
      margin-top: -1px;
    }

    &__icon-wrapper {
      position: absolute;
      right: $spacing--5;
      top: 50%;
      height: 100%;
      transform: translateY(-50%);
      display: flex;

      .e-icon {
        align-self: center;
      }
    }

    // active
    &__field:active,
    &--active &__field {
      border: 1px solid $color-grayscale--400;
    }

    // focus
    &__field:focus,
    &--focus &__field {
      outline: none;
      box-shadow: 0 2px 5px 0 rgba($color-grayscale--400, 0.5);
      border: 1px solid $color-grayscale--400;
    }

    // hover
    &__field:hover,
    &--hover &__field {
      border: 1px solid $color-grayscale--400;
    }

    // disabled
    &__field:disabled,
    &--disabled &__field,
    &--disabled &__field:hover {
      background-color: $color-grayscale--1000;
      border-color: $color-grayscale--600;
      color: $color-grayscale--600;

      &::placeholder {
        color: $color-grayscale--600;
      }
    }

    /**
     * states
     */
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      .e-textarea__icon-splitter {
        border-color: $color-status--danger;
      }
    }

    &--state-error &__field:hover,
    &--state-error &__field {
      border-color: $color-status--danger;
    }

    &--state-error &__field:focus {
      border-color: $color-status--danger;
    }

    &--state-info {
      .e-textarea__icon-splitter {
        border-color: $color-grayscale--500;
      }
    }

    &--state-success {
      .e-textarea__icon-splitter {
        display: none;
      }
    }

    &--state-success &__field:hover,
    &--state-success &__field {
      border-color: $color-status--success;
    }

    /*
     * Remove icon in background if notification is visible
     */
    &--notification {
      .e-textarea__field {
        padding: $spacing--5 $spacing--10;
        background: none;
      }
    }
  }
</style>
