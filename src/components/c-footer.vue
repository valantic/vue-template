<template>
  <footer :class="b()">
    <div :class="b('container')">
      <strong :class="b('dummy-text')"></strong>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'c-footer',

    // components: {},

    // props: {},
    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '@/setup/scss/mixins';

  .c-footer {
    display: flex;
    margin-top: auto;
    background: var(--theme-color-grayscale--900);

    &__container {
      @include mixins.layout();

      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    &__dummy-text::after {
      content: 'Styleguide Footer';
    }
  }
</style>
