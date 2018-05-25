<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <c-header/>
      <div :class="b('content')">
        <div :class="b('left')">
          <slot name="left"></slot>
        </div>
        <div :class="b('main')">
          <slot name="main"></slot>
        </div>
      </div>
      <c-footer/>
    </div>
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
    // flex-direction: column;
    // min-height: 100vh;

    @include media(xxs) {
      &__left {
        display: none;
        flex-basis: percentage(0);
      }

      &__main {
        flex-basis: percentage(1);
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

    &__wrapper {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    &__content {
      flex: 1 0 auto;
      display: flex;
      background: $color-grayscale--600;
    }

    &__left {
      padding: $spacing--10 $spacing--0 $spacing--10 $spacing--10;
    }

    &__main {
      padding: $spacing--10 $spacing--10 $spacing--10 $spacing--5;
    }
  }

</style>
