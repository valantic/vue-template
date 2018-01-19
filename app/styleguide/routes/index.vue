<template>
  <div :class="b()">
    <h1>Styleguide <small>[AIV]{version}[/AIV]</small></h1>
    <hr>
    <p>Welcome to the styleguide.</p>
    <div :class="b('warning')" v-if="isProduction">
      Please note: this build is not meant for production. Please use <code>npm run build</code> to create a production build.
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    computed: {
      isProduction() {
        return process.env.NODE_ENV === 'production';
      },
    },
  };
</script>

<style lang="scss">
  .index {
    &__warning {
      border: 1px solid red;
      background: coral;
      text-align: center;
      padding: 10px;
    }
  }
</style>