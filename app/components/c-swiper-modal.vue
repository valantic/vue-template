<template>
  <div :class="b()">
    <swiper ref="container"
            :class="b('container')"
            :options="optionsMerged">
      <swiper-slide v-for="picture in pictures"
                    :class="b('slide')"
                    :key="picuture.id">
        <e-picture
          :sizes="picuture.sizes"
          :srcset="picuture.srcset"
          :fallback="picuture.fallback"
          :alt="picuture.altText"/>
      </swiper-slide>
      <div slot="pagination" :class="b('pagination swiper-pagination')"></div>
      <div slot="button-prev" :class="b('button-prev swiper-button-prev')"></div>
      <div slot="button-next" :class="b('button-next swiper-button-next')"></div>
    </swiper>
  </div>
</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  // require styles
  import 'swiper/dist/css/swiper.css';

  /**
   * Touch enabled slider component based on
   * [vue-awesome-slider](https://github.com/surmon-china/vue-awesome-swiper) and
   * [swiper](http://idangero.us/swiper/api/).
   */
  export default {
    name: 'c-swiper-modal',
    components: {
      swiper,
      swiperSlide
    },

    // mixins: [],

    props: {
      /**
       * Gallery images passed to swiper
       */
      images: {
        type: Array,
        required: true,
      },

      /**
       * Swiper options passed by component
       */
      options: {
        type: Object,
        default: () => {
        },
      },
    },

    data() {
      return {
        optionsDefault: {
          keyboard: {
            enabled: true,
          },
          lazy: {
            elementClass: 'lazyload',
            loadPrevNext: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 6,
          },
        },
      };
    },

    computed: {
      optionsMerged() {
        return {
          ...this.optionsDefault,
          ...this.options,
        };
      },
      swiper() {
        return this.$refs.container.swiper;
      },

      pictures() {
        return [
          {
            fallback: 'http://via.placeholder.com/180x150/0000ff',
            srcset: {
              200: 'http://via.placeholder.com/200x100',
              400: 'http://via.placeholder.com/400x200',
              800: 'http://via.placeholder.com/800x400',
              1400: 'http://via.placeholder.com/1400x700',
            },
            sizes: {
              1440: 1400,
              xs: 200,
              sm: 400,
              md: 800,
            },
          },
        ]
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
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
  .c-swiper-modal {
    // ...
  }
</style>
