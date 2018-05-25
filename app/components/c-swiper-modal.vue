<template>
  <div :class="b()">
    <swiper ref="container"
            :class="b('container')"
            :options="optionsMerged">
      <swiper-slide v-for="picture in pictures" :class="b('slide')" :key="picture.id">
        <e-picture
          :sizes="picture.sizes"
          :srcset="picture.srcset"
          :fallback="picture.fallback"
          :alt="picture.alt"/>
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
        return this.images.map((image) => {
          const sizeKeys = ['xs', 'sm', 'md'];
          let sizes = {};
          let srcset = {};

          image.thumbs.map((thumb, i) => {
            Object.assign(srcset, { [thumb.width]: thumb.absolute_path })
            Object.assign(sizes, { [sizeKeys[i]]: thumb.width });
          });

          return {
            fallback: image.external_url_small,
            srcset,
            sizes,
            alt: '',
          };
        });
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      console.log(this.pictures);
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
  .c-swiper-modal {
    // ...
  }
</style>
