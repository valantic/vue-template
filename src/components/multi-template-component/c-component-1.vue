<template>
  <ul :class="b()">
    <li>
      Content A
    </li>
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
   * TODO: add description for component1 styleguide.
   *
   * @borrows ./c-component.js
   */
  export default {
    name: 'c-component-1',
    mixins: [component],
  };
</script>

<style lang="scss">
  .c-component-1 {
    // ...
  }
</style>
