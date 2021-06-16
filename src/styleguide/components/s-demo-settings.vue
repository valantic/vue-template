<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-toggle checked>
        Logged in
      </s-toggle>
    </li>
  </ul>
</template>

<script lang="ts">
  import sToggle from './s-toggle.vue';

  export default {
    name: 's-demo-settings',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sToggle,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

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
  };
</script>

<style lang="scss">
  .s-demo-settings {
    @extend %list-reset;
  }
</style>
