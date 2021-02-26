/* eslint-disable */
export default {
  name: null,

  // components: {},
  // mixins: [],

  // props: {},
  data() {
    return {
      counter: 1,
    };
  },

  // computed: {},
  // watch: {},

  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  mounted() {
    console.log("mounted", this.$options.name);
  },
  // beforeUpdate() {},
  // updated() {},
  // activated() {},
  // deactivated() {},
  // beforeDestroy() {},
  // destroyed() {},

  methods: {
    increase() {
      this.counter += 1;
    }
  },
  // render() {},
};
