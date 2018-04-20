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
            'darkgrey',
          ].includes(value);
        },
      },

      /**
       * Defines the level of the heading (h1-h6)
       */
      level: {
        type: String,
        required: true,
      },

      /**
       * Defines if the heading should have an underline
       */
      underline: {
        type: Boolean,
        default: null,
      },

      /**
       * Defines the font weight
       */
      weight: {
        type: String,
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
     * Creates a button or button like link based on defined/missing href link
     *
     * @param   {function}    createElement   Vue helper
     *
     * @returns {*}
     */
    render(createElement) {
      const element = this.$props.level;
      const attributes = {
        class: this.b({
          color: this.$props.color,
          underline: this.$props.underline === 'true',
          weight: this.$props.weight,
        }),
        attrs: {

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
    font-family: "Source Sans Pro", sans-serif;
    font-weight: normal;
    color: $color-secondary--1;
    letter-spacing: 2.03px;
    line-height: 23px;

    &.e-heading--weight-normal {
      font-weight: normal;
    }

    &.e-heading--weight-semibold {
      font-weight: 600;
    }

    &.e-heading--weight-bold {
      font-weight: bold;
    }

    &.e-heading--underline {
      text-decoration: underline;
    }

    &.e-heading--color-blue {
      color: $color-secondary--1;
    }

    &.e-heading--color-darkgrey {
      color: $color-grayscale--200;
    }

    &.e-heading--color-green {
      color: $color-secondary--3;
    }
  }

  h1.e-heading {
    font-size: 18px;
  }

  h2.e-heading {
    font-size: 16px;
  }

  h3.e-heading {
    font-size: 14px;
  }

  h4.e-heading {
    font-size: 14px;
    font-weight: bold;
  }

  h5.e-heading {
    font-size: 14px;
    font-weight: 600;
  }

  h6.e-heading {
    font-size: 14px;
  }
</style>
