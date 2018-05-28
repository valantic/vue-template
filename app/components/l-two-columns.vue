<template>
  <div :class="b()">
    <c-header/>
    <div :class="b('content')">
      <div :class="b('inner')">
        <div :class="b('left')">
          <slot name="left"></slot>
        </div>
        <div :class="b('main')">
          <slot name="main"></slot>
        </div>
      </div>
    </div>
    <c-footer/>
  </div>
</template>

<script>
  import cHeader from '@/components/c-header';
  import cFooter from '@/components/c-footer';

  export default {
    name: 'l-two-columns',
    components: {
      cHeader,
      cFooter,
    },
    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      const resizeHeader = function() {
        const height = document.getElementsByClassName('c-header')[0].offsetHeight;

        document.getElementsByClassName('l-two-columns__content')[0].style.marginTop = `${height}px`;
      };

      resizeHeader();
      window.addEventListener('resize', resizeHeader);
    },
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">

  .l-two-columns {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $color-grayscale--600;

    @include media(xxs) {
      &__left {
        display: none;
        flex-basis: 0;
      }

      &__main {
        flex-basis: 100%;
      }
    }

    @include media(sm) {
      &__left {
        display: block;
        flex-basis: percentage(1/4);
      }

      &__main {
        flex-basis: percentage(3/4);
      }
    }

    &__content {
      flex: 1 1 auto;
    }

    &__inner {
      flex: 1 0 auto;
      display: flex;
      max-width: map-get($grid-breakpoints, xl);
      margin: $spacing--0 auto $spacing--20 auto;
      padding: $spacing--10;
      background: $color-grayscale--600;
    }

    &__left {
      margin-right: $spacing--5;
    }
  }

</style>
