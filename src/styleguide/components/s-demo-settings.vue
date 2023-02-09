<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-html-validation />
      <s-toggle v-model="loggedIn">
        Logged in
      </s-toggle>
      <s-toggle v-model="showApiHandlerConfiguration">
        API Mock Test
      </s-toggle>
    </li>
  </ul>
  <s-api-mock-test v-if="showApiHandlerConfiguration" @click.stop @close="showApiHandlerConfiguration = false" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sToggle from '@/styleguide/components/s-toggle.vue';
  import sHtmlValidation from '@/styleguide/components/s-html-validation.vue';
  import sApiMockTest from '@/styleguide/components/s-api-mock-test.vue';

  interface IData {
    loggedIn: boolean;
    showApiHandlerConfiguration: boolean,
  }

  export default defineComponent({
    name: 's-demo-settings',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sApiMockTest,
      sHtmlValidation,
      sToggle,
    },

    // props: {},
    data(): IData {
      return {
        /**
         * Determines if the user is logged in.
         */
        loggedIn: true,

        /**
         * Determines if the api handler configuration is displayed.
         */
        showApiHandlerConfiguration: false,
      };
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
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
