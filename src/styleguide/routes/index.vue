<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <h1>
      Styleguide
      <small :class="b('build-info')">
        {{ buildDate }}
      </small>
    </h1>
    <hr>
    <p>Welcome to the styleguide.</p>
    <div v-if="isProduction" :class="b('warning')">
      Please note: this build is not meant for production. Please use <code :class="b('code')">npm run build</code> to
      create a production build.
    </div>

    <h2>README.md</h2>
    <hr>
    <s-readme />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sReadme from '@/styleguide/components/s-readme.vue';
  import dayjs from 'dayjs';

  export default defineComponent({
    name: 'index',
    components: { sReadme },

    data() {
      const buildDate = process.env.BUILD_TIMESTAMP
        ? dayjs(process.env.BUILD_TIMESTAMP).format('DD.MM.YYYY HH:mm')
        : null;

      return {
        buildDate
      };
    },

    computed: {
      /**
       * Checks, if production mode is active.
       */
      isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
      },
    },
  });
</script>

<style lang="scss">
  /* stylelint-disable selector-class-pattern */
  .index {
    max-width: map-get($breakpoints, xl);
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

    &__build-info {
      @include font-size($font-size--14);

      margin-left: $spacing--5;
    }
  }
</style>
