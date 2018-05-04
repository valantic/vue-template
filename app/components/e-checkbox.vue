<template>
  <div :class="b(modifiers)">

    <input
      :class="b('field')"
      :disabled="disabled"
      :value="value"
      :name="name"
      :id="name"
      v-bind="$attrs"
      v-model="internalValue"
      type="checkbox"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false">

    <label :for="name" :class="b('label')">
      <slot></slot>
    </label>

  </div>

</template>

<script>
  import formStates from '@/mixins/form-states';

  export default {
    name: 'e-checkbox',
    mixins: [formStates],
    inheritAttrs: false,

    model: {
      /**
       * Changes v-model behavior and use 'checked' instead of 'value' as prop.
       * Avoid a conflict with default value attribute.
       */
      prop: 'checked',
      event: 'change',
    },

    props: {
      /**
       * Adds checked attribute
       */
      checked: {
        type: [Boolean, Array],
        default: false,
      },

      /**
       * Adds name attribute
       * Note: is also used as id and for label (won't work without them)
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Adds value attribute
       */
      value: {
        type: String,
        required: true,
      },
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Sets value of component model to parent model
       *
       * @returns  {Boolean}   Status of the checkbox
       */
      internalValue: {
        get() {
          return this.checked;
        },
        set(value) {
          this.$emit('change', value);
        }
      },

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
       * Emits state to parent and wrapper component
       * Update "isChecked" state
       *
       * @param   {Boolean}  event   Field input
       */
      onChange(event) {
        this.isChecked = event.target.checked;
        this.$parent.$emit('change');
      },

      /**
       * Emits focus to parent and wrapper component
       * Update "hasFocus" state
       */
      onFocus() {
        this.hasFocus = true;

        this.$emit('focus');
        this.$parent.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component
       * Update "hasFocus" state
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
  .e-checkbox {
    &__field {
      // base for label styling
      &:not(:checked),
      &:checked {
        position: absolute;
        left: -9999px;
        cursor: pointer;
        -webkit-appearance: none;
      }

      &:not(:checked) + label,
      &:checked + label {
        position: relative;
        padding-left: $spacing--25;
      }

      /* checkbox aspect */
      &:not(:checked) + label::before,
      &:checked + label::before {
        background: $color-grayscale--1000;
        border: 1px solid $color-grayscale--500;
        border-radius: 3px;
        content: "";
        cursor: default;
        position: absolute;
        left: 0;
        top: 0;
        width: 17px;
        height: 17px;
      }

      /* checked mark aspect */
      &:not(:checked) + label::after,
      &:checked + label::after {
        background: transparent;
        color: $color-secondary--3;
        border-top: none;
        border-right: none;
        content: '✔';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 3px;
        height: 17px;
        width: 17px;
      }

      /* checked mark aspect changes */
      &:not(:checked) + label::after {
        opacity: 0;
        transform: scale(0);
      }

      &:checked + label::after {
        opacity: 1;
        transform: scale(1);
      }
    }

    &__label {
      color: $color-grayscale--400;
      font-size: $font-size--14;
      line-height: $font-size--18;
    }
  }

</style>
