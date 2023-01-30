<template>
  <div :class="b({ initialized })">
    <div ref="stage" :class="b('viewport')">
      <div :class="b('container')">
        <slot></slot>
      </div>
    </div>
    <button :class="b('button', { previous: true })"
            :aria-label="$t('c-slider.buttonPrevious')"
            :disabled="disablePrevious"
            type="button"
            @click="previous"
    >
      <e-icon icon="i-arrow--left" size="30" />
    </button>
    <button :class="b('button', { next: true })"
            :aria-label="$t('c-slider.buttonNext')"
            :disabled="disableNext"
            type="button"
            @click="next"
    >
      <e-icon icon="i-arrow--right" size="30" />
    </button>
  </div>
</template>

<script lang="ts">
  import EmblaCarousel, { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
  import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
  import {
    defineComponent, PropType,
    Ref,
    ref,
  } from 'vue';
  import eIcon from '@/components/e-icon.vue';

  interface ISetup {
    stage: Ref<HTMLDivElement>;
  }

  interface IData {
    emblaInstance: null | EmblaCarouselType;
    activeSlide: number;
    activePage: number;
    slidesPerPage: number;
    noOfPages: number;
    noOfSlides: number;
    initialized: boolean;
  }

  /**
   * Renders a slider.
   */
  export default defineComponent({
    name: 'c-slider',
    components: {
      eIcon,
    },

    props: {
      /**
       * Allows passing options for the Embla carousel.
       */
      options: {
        type: Object as PropType<EmblaOptionsType>,
        default: null,
      },

      /**
       * Allows defining auto play options.
       */
      autoPlayOptions: {
        type: Object as PropType<AutoplayOptionsType>,
        default: () => ({
          delay: 4000,
        }),
      },

      /**
       * Allows enabling autoplay.
       */
      autoPlay: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

    setup(): ISetup {
      const stage = ref();

      return {
        stage,
      };
    },
    data(): IData {
      return {
        emblaInstance: null,
        activeSlide: 0,
        activePage: 0,
        slidesPerPage: 0,
        noOfPages: 0,
        noOfSlides: 0,
        initialized: false,
      };
    },

    computed: {
      /**
       * Defines if the previous button should be disabled.
       *
       * @returns {Boolean}
       */
      disablePrevious(): boolean {
        return !this.options?.loop && this.activeSlide === 0;
      },

      /**
       * Defines if the next button should be disabled.
       *
       * @returns {Boolean}
       */
      disableNext(): boolean {
        return !this.options?.loop && this.activePage === this.noOfPages - 1;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      const plugins: EmblaPluginType[] = [];

      if (this.autoPlay) {
        plugins.push(Autoplay(this.autoPlayOptions)); // eslint-disable-line new-cap
      }

      this.emblaInstance = EmblaCarousel(this.stage as HTMLElement, { // eslint-disable-line new-cap
        align: 'start',
        skipSnaps: true,
        containScroll: 'keepSnaps',
        ...this.options,
      }, plugins);
      this.emblaInstance.on('select', this.onSelect);
      this.emblaInstance.on('init', this.onInit);
      this.emblaInstance.on('resize', this.onResize);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      this.emblaInstance?.destroy();
    },
    // unmounted() {},

    methods: {
      /**
       * Event handler for the sliders init event.
       */
      onInit(): void {
        this.updateActiveSlide();
        this.updateSlidesPerPage();
        this.initialized = true;
      },

      /**
       * Event handler for the sliders select event.
       */
      onSelect(): void {
        this.updateActiveSlide();
        this.updateActivePage();
      },

      /**
       * Event handler for the resize event of the slider instance.
       */
      onResize(): void {
        this.updateSlidesPerPage();
      },

      /**
       * Scrolls to next page.
       */
      next(): void {
        this.scrollTo(this.activePage + 1);
      },

      /**
       * Scrolls to previous page.
       */
      previous(): void {
        this.scrollTo(this.activePage - 1);
      },

      /**
       * Scrolls to given page.
       */
      scrollTo(page: number): void {
        const pageBySlide = page * this.slidesPerPage;

        this.emblaInstance?.scrollTo(pageBySlide);
      },

      /**
       * Recalculates the amount of slides per page.
       */
      updateSlidesPerPage(): void {
        this.slidesPerPage = this.emblaInstance?.slidesInView().length || 1;
        this.noOfPages = this.noOfSlides ? Math.ceil(this.noOfSlides / this.slidesPerPage) : 1;
      },

      /**
       * Updates the active page.
       */
      updateActivePage(): void {
        this.activePage = Math.floor((this.emblaInstance?.selectedScrollSnap() || 0) / this.slidesPerPage);
      },

      /**
       * Updates the slides active classes.
       */
      updateActiveSlide(): void {
        this.activeSlide = this.emblaInstance?.selectedScrollSnap() || 0;
        this.noOfSlides = this.emblaInstance?.slideNodes().length || 0;
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';
  // @use '../setup/scss/extends' as *;
  // @use '../setup/scss/functions' as *;

  .c-slider {
    position: relative;

    &__viewport {
      overflow: hidden;
      width: 100%;
    }

    &__container {
      display: flex;
    }

    &__button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: variables.$color-grayscale--1000;
      background-color: variables.$color-primary--2;
      padding: variables.$spacing--5;
      transition: opacity variables.$transition-duration--100 ease-in-out;
      opacity: 0;
      cursor: pointer;
    }

    &__button[disabled] {
      opacity: 0;
      cursor: default;
    }

    &__button--next {
      right: 20px;
    }

    &__button--previous {
      left: 20px;
    }

    &--initialized &__button:not([disabled]) {
      opacity: 1;
    }
  }
</style>
