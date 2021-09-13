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

<script>
  import sReadme from '@/styleguide/components/s-readme';
  import dayjs from 'dayjs';

  export default {
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
       *
       * @returns {Boolean}
       */
      isProduction() {
        return process.env.NODE_ENV === 'production';
      },
    },
  };
</script>

<style lang="scss">
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  /* stylelint-disable selector-class-pattern */
  .index {
    max-width: map-get(variables.$breakpoints, xl);
    margin: 0 auto;
    padding: variables.$spacing--30;

    &__warning {
      border: 1px solid variables.$color-status--danger;
      background: rgba(variables.$color-status--danger--rgb, 0.5);
      text-align: center;
      padding: variables.$spacing--10;
    }

    &__code {
      display: inline-block;
      border: 1px solid variables.$color-grayscale--400;
      background: rgba(variables.$color-primary--2--rgb, 0.5);
      color: variables.$color-primary--3;
    }

    &__build-info {
      @include mixins.font-size(variables.$font-size--14);

      margin-left: variables.$spacing--5;
    }
  }
</style>
