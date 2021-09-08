<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-toggle v-model="htmlValidation">
        HTML validation
      </s-toggle>
      <s-toggle v-model="loggedIn">
        Logged in
      </s-toggle>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sToggle from './s-toggle.vue';

  interface IData {
    htmlValidation: boolean;
    loggedIn: boolean;
  }

  const showHtmlValidationClass = 'html-validation';

  export default defineComponent({
    name: 's-demo-settings',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sToggle,
    },

    // props: {},
    data(): IData {
      return {
        /**
         * Determines if the HTML validation styles should be applied.
         */
        htmlValidation: true,

        /**
         * Determines if the user is logged in.
         */
        loggedIn: true,
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .s-demo-settings {
    @extend %list-reset;
  }
</style>

<style src="@/styleguide/html-validation.scss"></style>
