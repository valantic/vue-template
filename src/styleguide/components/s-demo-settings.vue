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

<script lang="ts">
  import { defineComponent } from 'vue';
  import sToggle from './s-toggle.vue';

  const showHtmlValidationClass = 'html-validation';

  export default defineComponent({
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

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
</script>

<style lang="scss">
  .s-demo-settings {
    @extend %list-reset;
  }
</style>

<style src="@/styleguide/html-validation.scss"></style>
