<template>
  <div v-focus-mask :class="b()">
    <h1>Focus mask</h1>
    <h2>Default</h2>
    <div v-focus-item="hasFocus">
      I have the focus.
      <br>
      <br>
      <button type="button"
              @click="hasFocus = !hasFocus"
      >
        Toggle focus
      </button>
    </div>
    <h2>Variant</h2>
    <div v-focus-item:color="hasColorFocus">
      I have the focus.
      <br>
      <br>
      <button type="button"
              @click="hasColorFocus = !hasColorFocus"
      >
        Toggle focus
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {}

  type Data = {
    hasFocus: boolean;
    hasColorFocus: boolean;
  }

  /**
   * Showcase for the consent plugin.
   */
  export default defineComponent({
    name: 'r-consent',

    // components: {},

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        hasFocus: false,
        hasColorFocus: false,
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
  // @use '@/setup/scss/variables';

  .r-consent {
    padding: 50px;
  }
</style>
