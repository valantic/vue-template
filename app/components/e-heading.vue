<!-- This component has no <template> because of dynamic root element -->

<script>
  export default {
    name: 'e-heading',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the color of the heading (h1-h6)
       * 
       * Valid values: `blue, gray`
       */
      color: {
        type: String,
        default: 'blue',
        validator(value) {
          return [
            'blue',
            'gray',
          ].includes(value);
        },
      },

      /**
       * Defines the tagname of the heading (h1-h6)
       * 
       * Valid values: `h1, h2, h3, h4, h5, h6`
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
        default: false,
      },

      /**
       * Defines the font weight
       * 
       * Valid values: `normal, semibold, bold`
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
          [this.$props.tagName]: true
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
    font-weight: $font-weight--regular;
    color: $color-secondary--1;
    line-height: 1.25;
    text-decoration: none;

    & a {
      color: $color-secondary--1;
      border: none;
      padding: $spacing--0;
    }

    &--h1 {
      font-size: $font-size--18;
    }

    &--h2 {
      font-size: $font-size--16;
    }

    &--h3 {
      font-size: $font-size--14;
    }

    &--h4 {
      font-size: $font-size--14;
      font-weight: $font-weight--bold;
    }

    &--h5 {
      font-size: $font-size--14;
      font-weight: $font-weight--semi-bold;
    }

    &--h6 {
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
      display: block;
      border-bottom: 1px solid $color-primary--1;
      padding: $spacing--15 $spacing--20;
    }

    &--color-blue {
      color: $color-secondary--1;

      & a {
        color: $color-secondary--1;
      }
    }

    &--color-gray {
      color: $color-grayscale--200;

      & a {
        color: $color-grayscale--200;
      }
    }
  }
</style>
