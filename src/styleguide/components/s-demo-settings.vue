<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-html-validation />
      <e-checkbox v-model="loggedIn"
                  variant="toggle"
                  name="logged-in"
                  value
      >
        Logged in
      </e-checkbox>

      <e-checkbox v-model="showApiHandlerConfiguration"
                  variant="toggle"
                  name="api-mock"
                  value
      >
        API Mock Test
      </e-checkbox>
    </li>
  </ul>
  <s-api-mock-test v-if="showApiHandlerConfiguration" @click.stop @close="showApiHandlerConfiguration = false" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sHtmlValidation from '@/styleguide/components/s-html-validation.vue';
  import eCheckbox from '@/elements/e-checkbox.vue';
  import sApiMockTest from '@/styleguide/components/s-api-mock-test.vue';

  interface IData {

    /**
     * Determines if the user is logged in.
     */
    loggedIn: boolean;

    /**
     * Determines if the api handler configuration is displayed.
     */
    showApiHandlerConfiguration: boolean,
  }

  export default defineComponent({
    name: 's-demo-settings',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eCheckbox,
      sApiMockTest,
      sHtmlValidation,
    },

    // props: {},
    data(): IData {
      return {
        loggedIn: true,
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
