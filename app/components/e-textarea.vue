<template>
  <div :class="b(modifiers)">
    <textarea :class="b('field')"
              :name="name"
              v-bind="$attrs"
              @focus="onFocus"
              @blur="onBlur"
              @input="onInput">
    </textarea>
  </div>
</template>

<script>
  import formStates from '@/mixins/form-states';

  export default {
    name: 'e-textarea',
    // components: {},
    mixins: [formStates],

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
      }
    },
    // data() {
    //   return {};
    // },

    computed: {

      /**
       * Defines state modifier classes
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          ...this.stateModifiers
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
      onInput(event) {
        this.$emit('input', event.target.value);
      },

      /**
       * Emits focus to parent and wrapper component
       * Updates "hasFocus" state
       */
      onFocus() {
        this.hasFocus = true;

        this.$emit('focus');
        this.$parent.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component
       * Updates "hasFocus" state
       */
      onBlur() {
        this.hasFocus = false;

        this.$emit('blur');
        this.$parent.$emit('blur');
      }
    }
    // render() {},
  };
</script>

<style lang="scss">
  .e-textarea {
    @include half-border($color-grayscale--500);

    &::before,
    &::after {
      pointer-events: none;
    }

    &__field {
      padding: 5px;
      color: $color-grayscale--400;
      resize: none;
      width: 100%;
      border-radius: 3px;
      border: 1px solid transparent;
      display: block;
    }

    &__field::placeholder {
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field:active,
    &--active &__field {
      box-shadow: 0 2px 5px 0 rgba($color-grayscale--400, 0.5);
      border: 1px solid $color-grayscale--500;
    }

    &__field:focus,
    &--focus &__field {
      outline: none;
      border: 1px solid $color-grayscale--500;
    }

    &__field:hover,
    &--hover &__field {
      border: 1px solid $color-grayscale--500;
    }

    /**
     * states
     */

    &--state-error {
      @include half-border($color-secondary--4);
    }

    &--state-error &__field:hover {
      border-color: $color-secondary--4;
    }
  }
</style>
