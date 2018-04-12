<!-- This component has no <template> because of dynamic root element -->

<script>
  export default {
    name: 'e-button',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the width of the button
       *
       * Valid values: `full`
       */
      width: {
        type: String,
        default: null,
        validator(value) {
          return [
            'full',
          ].includes(value);
        },
      },

      /**
       * Inverts the button style
       */
      inverted: {
        type: [Boolean, String],
        default: false,
      },

      /**
       * Modifies the inner spacing for the button.
       *
       * Valid values: `0, 500`
       */
      spacing: {
        type: [String, Number],
        default: '500',
        validator(value) {
          return [
            0,
            500
          ].includes(parseInt(value, 10));
        }
      },

      /**
       * If `true` the button gets the negative style
       */
      negative: {
        type: [Boolean, String],
        default: false,
      },

      /**
       * IF `true` the button shows a progress animation
       */
      progress: {
        type: [Boolean, String],
        default: false,
      }
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

    // methods: {},

    /**
     * Creates a button or button like link based on defined/missing href link
     *
     * @param   {function}    createElement   Vue helper
     *
     * @returns {*}
     */
    render(createElement) {
      const isButton = !this.$attrs.href;
      const element = isButton ? 'button' : 'a';
      const options = {
        class: this.b({
          width: this.$props.width,
          inverted: this.$props.inverted === 'true' || this.$props.inverted,
          spacing: this.$props.spacing,
          negative: this.$props.negative === 'true' || this.$props.negative,
          progress: this.$props.progress === 'true' || this.$props.progress,
        }),
        attrs: {
          ...this.$attrs,
        },
      };

      if (!isButton && !options.attrs.role) {
        options.attrs.role = 'button';
      }

      return createElement(
        element,
        options,
        this.$slots.default, // TODO: How to handle progress state?
      );
    },
  };
</script>

<style lang="scss">
  .e-button {
    display: inline-block;
    background: $color-primary--3;
    border: 1px solid $color-primary--2;
    padding: $spacing--10;

    &--width-full {
      display: block;
      width: 100%;
    }

    &--inverted {
      background: $color-primary--2;
      color: $color-primary--3;
    }

    &--progress {
      text-indent: -200vw;

      &::after {
        content: "...";
        display: block;
      }
    }
  }
</style>
