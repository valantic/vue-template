<!-- This component has no <template> because of dynamic root element -->

<script>
  import propScale from '@/helpers/prop.scale';

  export default {
    name: 'e-heading',
    status: 0,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the tagname of the heading (h1-h6).
       *
       * Valid values: `[h1, h2, h3, h4, h5, h6]`
       */
      tagName: {
        type: String,
        default: 'h1',
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
       * Defines the font-weight
       *
       * Valid values: `[normal, semibold, bold]`
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

      /**
       * Defines spacing for the heading element.
       *
       * Valid values: `[400, 500, 700, 800]`
       */
      spacing: propScale(500, [
        400,
        500,
        700,
        800,
      ]),

      /**
       * Defines if the heading shall be uppercase.
       */
      uppercase: {
        type: Boolean,
        default: false,
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
     * @param {Function} createElement - Vue helper.
     *
     * @returns {*}
     */
    render(createElement) {
      const element = this.$props.tagName;
      const attributes = {
        class: this.b({
          color: this.$props.color,
          uppercase: this.$props.uppercase,
          fontWeight: this.$props.fontWeight,
          spacing: this.$props.spacing,
          [this.$props.tagName]: true
        }),
        attrs: {
          ...this.$attrs,
        },
      };

      const childAttributes = {
        class: this.b('inner', { color: this.$props.color, spacing: this.$props.spacing }),
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

    &--uppercase {
      text-transform: uppercase;
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
    }

    &--h5 {
      @include font($font-size--14);
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
  }
</style>
