<!-- TODO - This component is supposed to be functional -->
<template>
  <div :class="b()">
    <c-header/>
    <div :class="b('content')">
      <div :class="b('inner')">
        <slot></slot>
      </div>
    </div>
    <c-footer/>
  </div>
</template>

<script>
  import cHeader from '@/components/c-header';
  import cFooter from '@/components/c-footer';

  export default {
    name: 'l-default',
    components: {
      cHeader,
      cFooter
    },
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

        document.getElementsByClassName('l-default__content')[0].style.marginTop = `${height}px`;
      };

      resizeHeader();
      window.addEventListener('resize', resizeHeader);
    },
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

  .l-default {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__content {
      flex: 1 0 auto;
      min-height: 1px; // Fixes a content shifting issue with IE11 if a child element has hover
    }

    &__inner {
      max-width: map-get($grid-breakpoints, xl);
      margin: 0 auto;
    }
  }

  .s-layout {
    max-width: initial;
    margin: initial;
  }
</style>
