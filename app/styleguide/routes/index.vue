<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <h1>Styleguide
      <small>[AIV]{version}[/AIV]</small>
    </h1>
    <hr>
    <p>Welcome to the styleguide.</p>
    <div v-if="isProduction" :class="b('warning')">
      Please note: this build is not meant for production. Please use <code :class="b('code')">npm run build</code> to
      create a production build.
    </div>

    <h2>README.md</h2>
    <hr>
    <s-readme/>
  </div>
</template>

<script>
  import SReadme from '@/styleguide/components/s-readme';

  export default {
    name: 'index',
    components: { SReadme },
    computed: {
      isProduction() {
        return process.env.NODE_ENV === 'production';
      },
    },
  };
</script>

<style lang="scss">
  /* stylelint-disable selector-class-pattern */
  .index {
    max-width: map-get($grid-breakpoints, xl);
    margin: 0 auto;
    padding: $spacing--30;

    &__warning {
      border: 1px solid $color-status--danger;
      background: rgba($color-status--danger--rgb, 0.5);
      text-align: center;
      padding: $spacing--10;
    }

    &__code {
      display: inline-block;
      border: 1px solid $color-grayscale--400;
      background: rgba($color-primary--2--rgb, 0.5);
      color: $color-primary--3;
    }
  }
</style>
