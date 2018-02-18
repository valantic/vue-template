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
      const element = this.$attrs.href ? 'a' : 'button';
      const attributes = {
        class: this.b({
          width: this.$props.width,
          inverted: this.$props.inverted === 'true' || this.$props.inverted,
        }),
        attrs: {
          ...this.$attrs,
        },
      };

      return createElement(
        element,
        attributes,
        this.$slots.default,
      );
    },
  };
</script>

<style lang="scss">
  .e-button {
    display: inline-block;
    background: $color-gray--white;
    border: 1px solid black;
    padding: $spacing--10;

    &--width-full {
      display: block;
      width: 100%;
    }

    &--inverted {
      background: $color-gray--black;
    }
  }
</style>
