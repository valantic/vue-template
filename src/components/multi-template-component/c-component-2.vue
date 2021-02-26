<template>
  <ul :class="b()">
    <li>Content B</li>
    <li>
      {{ counter }}
    </li>
    <li>
      <button @click="increase">
        Increase
      </button>
    </li>
  </ul>
</template>

<script>
  import component from './c-component';

  /**
   * TODO: add description for component styleguide.
   */
  export default {
    name: 'c-component-2',
    mixins: [component],
  };
</script>

<style lang="scss">
  .c-component-2 {
    // ...
  }
</style>
