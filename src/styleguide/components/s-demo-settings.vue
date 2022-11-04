<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-html-validation />
      <s-toggle checked>
        Logged in
      </s-toggle>
    </li>
  </ul>
</template>

<script>
  import sToggle from './s-toggle';
  import sHtmlValidation from './s-html-validation';

  export default {
    name: 's-demo-settings',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sHtmlValidation,
      sToggle,
    },
    // mixins: [],

    // props: {},
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
    // render() {},
  };
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  .s-demo-settings {
    margin-top: variables.$spacing--10;

    .s-toggle + .s-toggle {
      margin-top: variables.$spacing--5;
    }
  }
</style>
