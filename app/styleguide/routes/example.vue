<template>
  <div :class="b()">
    <h1>Example</h1>
    <e-icon icon="styleguide-heart" width="100"></e-icon>
  </div>
</template>

<script>
  export default {
    name: 'example',
  };
</script>

<style lang="scss">
  .foo {
    color: red;
  }
</style>
