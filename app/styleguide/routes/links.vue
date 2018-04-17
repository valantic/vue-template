<template>
  <div :class="b()">
    <h1>Link examples</h1>

    <!-- default -->
    <a href="#0" class="link">default</a><br><br>

    <!-- hover -->
    <a href="#0" class="link link--hover">hover</a><br><br>

  </div>
</template>

<script>
  export default {
    name: 'links',
  };
</script>

<style lang="scss">

  // demo only
  .links {
    padding: $spacing--50;
    text-align: center;

    h1 {
      padding-bottom: $spacing--50;
    }

    h2 {
      font-size: 1em;
    }
  }
</style>
