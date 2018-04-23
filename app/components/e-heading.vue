<!-- This component has no <template> because of dynamic root element -->

<script>
  export default {
    name: 'e-heading',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the color of the heading (h1-h6)
       */
      color: {
        type: String,
        default: 'blue',
        validator(value) {
          return [
            'blue',
            'green',
            'gray',
          ].includes(value);
        },
      },

      /**
       * Defines the tagname of the heading (h1-h6)
       */
      tagName: {
        type: String,
        required: true,
        validator(value) {
          return [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
          ].includes(value);
        },
      },

      /**
       * Defines if the heading should have an underline
       */
      underline: {
        type: Boolean,
        default: true,
      },

      /**
       * Defines the font weight
       */
      weight: {
        type: String,
        default: 'normal',
        validator(value) {
          return [
            'normal',
            'semibold',
            'bold',
          ].includes(value);
        },
      },
    },

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
     * Creates a heading element
     *
     * @param   {function}    createElement   Vue helper
     *
     * @returns {*}
     */
    render(createElement) {
      const element = this.$props.tagName;
      const attributes = {
        class: this.b({
          color: this.$props.color,
          underline: this.$props.underline,
          weight: this.$props.weight,
          tagname: this.$props.tagName,
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
  .e-heading {
    font-family: $font-family--primary;
    font-weight: normal;
    color: $color-secondary--1;
    letter-spacing: 2.03px;
    line-height: 23px;
    text-decoration: none;

    &--tagname-h1 {
      font-size: $font-size--18;
    }

    &--tagname-h2 {
      font-size: $font-size--16;
    }

    &--tagname-h3 {
      font-size: $font-size--14;
    }

    &--tagname-h4 {
      font-size: $font-size--14;
      font-weight: $font-weight--bold;
    }

    &--tagname-h5 {
      font-size: $font-size--14;
      font-weight: $font-weight--semi-bold;
    }

    &--tagname-h6 {
      font-size: $font-size--14;
    }

    &--weight-normal {
      font-weight: $font-weight--regular;
    }

    &--weight-semibold {
      font-weight: $font-weight--semi-bold;
    }

    &--weight-bold {
      font-weight: $font-weight--bold;
    }

    &--underline {
      display: inline-block;
      border-bottom: 1px solid $color-primary--1;
      padding-left: $spacing--20;
      padding-right: $spacing--20;
      line-height: 54px;
    }

    &--color-blue {
      color: $color-secondary--1;
    }

    &--color-gray {
      color: $color-grayscale--200;
    }

    &--color-green {
      color: $color-secondary--3;
    }
  }
</style>
