<script>

  /**
   * This is a functional component, which only renders his root component inside itself if the `showRoot` property is
   * set to true. It's currently only working with default elements, but not with components.
   *
   * One use case is if you want to wrap a component in an <a> tag only if it has a valid link.
   *
   * Source: https://forum.vuejs.org/t/conditionally-render-parent-element/9324/2
   */
  export default {
    name: 'e-with-root',
    functional: true,
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines if root element should be rendered.
       */
      showRoot: {
        type: Boolean,
        required: true,
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
    render(createElement, context) {
      const children = context.children.filter(vnode => vnode.tag); // Remove unnecessary text nodes.

      if (children.length !== 1) {
        throw new Error('This component accepts only one root node in its slot.');
      }

      return context.props.showRoot ? children[0] : children[0].children;
    },
  };
</script>
