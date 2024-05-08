<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <h1>Styleguide</h1>
    <hr />
    <p>Welcome to the styleguide.</p>
    <div
      v-if="isProduction"
      :class="b('warning')"
    >
      Please note: this build is not meant for production. Please use <code :class="b('code')">npm run build</code> to
      create a production build.
    </div>

    <h2>README.md</h2>
    <hr />
    <s-readme />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sReadme from '@/styleguide/components/s-readme.vue';

  export default defineComponent({
    name: 'r-index',
    components: { sReadme },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Checks, if production mode is active.
       */
      isProduction(): boolean {
        return import.meta.env.MODE === 'production';
      },
    },
  });
</script>

<style lang="scss">
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .r-index {
    max-width: map-get(variables.$breakpoints, xl);
    margin: 0 auto;
    padding: variables.$spacing--30;

    &__warning {
      padding: variables.$spacing--10;
      border: 1px solid variables.$color-status--error;
      background: rgba(variables.$color-status--error--rgb, 0.5);
      text-align: center;
    }

    &__code {
      display: inline-block;
      border: 1px solid variables.$color-grayscale--400;
      background: rgba(variables.$color-primary--2--rgb, 0.5);
      color: variables.$color-primary--3;
    }
  }
</style>
