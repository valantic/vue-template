<template>
  <div :class="b({ initialized: !!emblaInstance })">
    <div
      ref="stage"
      :class="b('stage')"
    >
      <ul :class="b('stage-inner')">
        <slot></slot>
      </ul>
    </div>
    <button
      :class="b('navigation', { previous: true })"
      :aria-label="$t('c-slider.navigationPrevious')"
      :disabled="disablePrevious"
      type="button"
      @click="previousPage"
    >
      <e-icon
        icon="i-arrow--left"
        size="30"
      />
    </button>
    <button
      :class="b('navigation', { next: true })"
      :aria-label="$t('c-slider.navigationNext')"
      :disabled="disableNext"
      type="button"
      @click="nextPage"
    >
      <e-icon
        icon="i-arrow--right"
        size="30"
      />
    </button>
  </div>
</template>

<script lang="ts">
  import EmblaCarousel, { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
  import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
  import { PropType, Ref, defineComponent, ref } from 'vue';
  import eIcon from '@/elements/e-icon.vue';

  type Setup = {
    stage: Ref<HTMLDivElement>;
  };

  type Data = {
    emblaInstance: null | EmblaCarouselType;
    activeSlide: number;
    activePage: number;
    slidesPerPage: number;
    noOfPages: number;
  };

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
          stopOnMouseEnter: true,
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

    setup(): Setup {
      const stage = ref();

      return {
        stage,
      };
    },
    data(): Data {
      return {
        emblaInstance: null,
        activeSlide: 0,
        activePage: 0,
        slidesPerPage: 0,
        noOfPages: 0,
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

      // eslint-disable-next-line new-cap
      this.emblaInstance = EmblaCarousel(
        this.stage as HTMLElement,
        {
          align: 'start',
          skipSnaps: true,
          containScroll: 'keepSnaps',
          ...this.options,
        },
        plugins
      );
      this.emblaInstance.on('select', this.onEmblaSelect);
      this.emblaInstance.on('init', this.onEmblaInit);
      this.emblaInstance.on('resize', this.onEmblaResize);
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
      onEmblaInit(): void {
        this.updateActiveSlide();
        this.updateSlidesPerPage();
      },

      /**
       * Event handler for the sliders select event.
       */
      onEmblaSelect(): void {
        this.updateActiveSlide();
        this.updateActivePage();
      },

      /**
       * Event handler for the resize event of the slider instance.
       */
      onEmblaResize(): void {
        this.updateSlidesPerPage();
      },

      /**
       * Scrolls to next page.
       */
      nextPage(): void {
        this.scrollToPage(this.activePage + 1);
      },

      /**
       * Scrolls to previous page.
       */
      previousPage(): void {
        this.scrollToPage(this.activePage - 1);
      },

      /**
       * Scrolls to given page.
       */
      scrollToPage(page: number): void {
        const slideByPage = page * this.slidesPerPage;

        this.emblaInstance?.scrollTo(slideByPage);
      },

      /**
       * Recalculates the amount of slides per page.
       */
      updateSlidesPerPage(): void {
        const totalNumberOfSlides = this.emblaInstance?.slideNodes().length;

        this.slidesPerPage = this.emblaInstance?.slidesInView().length || 1;
        this.noOfPages = totalNumberOfSlides ? Math.ceil(totalNumberOfSlides / this.slidesPerPage) : 1;
      },

      /**
       * Updates the active page.
       */
      updateActivePage(): void {
        this.activePage = Math.floor((this.emblaInstance?.selectedScrollSnap() || 0) / this.slidesPerPage);
      },

      /**
       * Updates active slide state.
       */
      updateActiveSlide(): void {
        this.activeSlide = this.emblaInstance?.selectedScrollSnap() || 0;
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';
  // @use '../setup/scss/extends';
  // @use '../setup/scss/functions';

  .c-slider {
    position: relative;

    &__stage {
      width: 100%;
      overflow: hidden;
    }

    &__stage-inner {
      display: flex;
    }

    &__navigation {
      position: absolute;
      top: 50%;
      padding: variables.$spacing--5;
      opacity: 0;
      background-color: variables.$color-primary--2;
      transform: translateY(-50%);
      cursor: pointer;
      color: variables.$color-grayscale--1000;
      transition: opacity variables.$transition-duration--100 ease-in-out;

      &--next {
        right: 20px;
      }

      &--previous {
        left: 20px;
      }

      &[disabled] {
        opacity: 0;
        cursor: default;
      }
    }

    &--initialized &__navigation:not([disabled]) {
      opacity: 1;
    }
  }
</style>
