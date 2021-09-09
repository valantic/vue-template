<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-toggle v-model="htmlValidation">
        HTML validation
      </s-toggle>
      <s-toggle checked>
        Logged in
      </s-toggle>
    </li>
  </ul>
</template>

<script>
  import sToggle from './s-toggle';

  const showHtmlValidationClass = 'html-validation';

  export default {
    name: 's-demo-settings',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sToggle,
    },
    // mixins: [],

    // props: {},
    data() {
      return {
        /**
         * @type {Boolean} Determines if the HTML validation styles should be applied.
         */
        htmlValidation: true,
      };
    },

    // computed: {},
    watch: {
      htmlValidation: {
        immediate: true,
        handler(show) {
          if (show) {
            document.body.classList.add(showHtmlValidationClass);
          } else {
            document.body.classList.remove(showHtmlValidationClass);
          }
        }
      },
    },

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
  .s-demo-settings {
    margin-top: $spacing--10;

    .s-toggle + .s-toggle {
      margin-top: $spacing--5;
    }
  }
</style>

<style src="@/styleguide/html-validation.scss"></style>
