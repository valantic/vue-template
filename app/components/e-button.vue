<!-- This component has no <template> because of dynamic root element -->

<script>
  export default {
    name: 'e-button',
    // components: {},
    // mixins: [],

    props: {
      href: {
        type: String,
        default: null,
      },
      width: {
        type: String,
        default: null,
        validator(value) {
          return [
            'full',
          ].includes(value);
        },
      },
      inverted: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'button',
        validator(value) {
          return [
            'submit',
            'reset',
            'button',
          ].includes(value);
        },
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
      const isLink = !!this.href;
      const element = isLink ? 'a' : 'button';
      const attributes = {
        class: this.b(),
        attrs: {},
      };

      if (isLink) {
        attributes.attrs.href = this.href;
      } else {
        attributes.type = this.type;
      }

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
    background: $color-gray--white;
    border: 1px solid black;
    padding: $spacing--10;
  }
</style>
