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
       * Defines the font-weight
       *
       * Valid values: `normal, semibold, bold`
       */
      fontWeight: {
        type: String,
        required: false,
        default: null,
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
     * Creates a heading element.
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
          fontWeight: this.$props.fontWeight,
          [this.$props.tagName]: true
        }),
        attrs: {
          ...this.$attrs,
        },
      };
      const childAttributes = {
        class: this.b('inner', { color: this.$props.color }),
      };

      return createElement(
        element,
        attributes,
        [
          createElement('span', childAttributes, this.$slots.default)
        ],
      );
    },
  };
</script>

<style lang="scss">
  .e-heading {
    @include font($font-size--18, 22px, $font-weight--regular);

    display: block;

    &__inner {
      display: inline-block;
    }

    &__inner a {
      color: $color-secondary--1;
      padding: $spacing--0;
    }

    &--underline &__inner {
      border-bottom: 1px solid $color-primary--1;
    }

    &--h1 {
      @include font($font-size--18);
    }

    &--h2 {
      @include font($font-size--16);
    }

    &--h3 {
      @include font($font-size--14);
    }

    &--h4 {
      @include font($font-size--14);

      font-weight: $font-weight--bold;
    }

    &--h5 {
      @include font($font-size--14);

      font-weight: $font-weight--semi-bold;
    }

    &--h6 {
      @include font($font-size--14);
    }

    &--font-weight-normal {
      font-weight: $font-weight--regular;
    }

    &--font-weight-semibold {
      font-weight: $font-weight--semi-bold;
    }

    &--font-weight-bold {
      font-weight: $font-weight--bold;
    }

    &--color-blue {
      color: $color-secondary--1;

      a {
        color: $color-secondary--1;
      }
    }

    &--color-gray {
      color: $color-grayscale--400;

      a {
        color: $color-grayscale--400;
      }
    }
  }
</style>
