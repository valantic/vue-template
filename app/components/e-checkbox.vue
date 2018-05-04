<template>
  <div :class="b(modifiers)">

    <input
      :checked="checked"
      :class="b('field')"
      :disabled="disabled"
      v-bind="$attrs"
      type="checkbox"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @mouseenter="hasHover = true"
      @mouseleave="hasHover = false">
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
      event: 'change'
    },

    // props: {},

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
       * Emits state to parent and wrapper component
       * Update "isChecked" state
       *
       * @param   {Boolean}  event   Field input
       */
      onChange(event) {
        this.isChecked = event.target.checked;
        this.$emit('change', event.target.checked);
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
  }
</style>
