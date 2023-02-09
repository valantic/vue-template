<template>
  <component
    :is="rootElement"
    :class="b()"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- @slot The slot for the tooltips anchor element(s). -->
    <slot></slot>

    <!-- Moves tooltip to a portal to prevent invalid HTML nesting. -->
    <Teleport to="body">
      <div
        ref="tooltip"
        :class="b('tooltip-wrapper')"
        @load.capture="onLoad"
      >
        <div :class="b('tooltip')">
          <!-- @slot This slot will be used for the tooltip content. -->
          <slot name="tooltip"></slot>
        </div>
      </div>
    </Teleport>
  </component>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    Ref,
    ref,
  } from 'vue';
  import { createPopper, Instance, Options } from '@popperjs/core';
  import {
    CLASS_TOOLTIP_WRAPPER_ACTIVE,
    CLASS_TOOLTIP_WRAPPER_VISIBLE,
    DEBOUNCE_CLOSE,
    DEFAULT_POPPER_OPTIONS,
  } from '@/plugins/tooltip/shared';

  interface ISetup {
    tooltip: Ref<HTMLDivElement>;
  }

  interface IData {

    /**
     * Holds the component instance related popper instance.
     */
    popperInstance: Instance | null;

    /**
     * Holds a debounce timeout for the mouseleave event.
     */
    mouseLeaveDebounce: ReturnType<typeof setTimeout> | null;
  }

  /**
   * Renders a tooltip for the elements inside its slot.
   */
  export default defineComponent({
    name: 'c-tooltip',

    // components: {},

    props: {
      /**
       * Allows to customize the popper instance.
       */
      popperOptions: {
        type: Object as PropType<Partial<Options>>,
        default: null,
      },

      /**
       * Allows to change the root element for the component.
       */
      rootElement: {
        type: String,
        default: 'div',
      },
    },
    // emits: {},

    setup(): ISetup {
      const tooltip = ref();

      return {
        tooltip,
      };
    },
    data(): IData {
      return {
        popperInstance: null,
        mouseLeaveDebounce: null,
      };
    },

    computed: {
      /**
       * Returns the merged default and customized popper options.
       */
      mergedPopperOptions(): Options {
        return {
          ...DEFAULT_POPPER_OPTIONS,
          ...this.popperOptions,
        };
      },
    },
    watch: {
      /**
       * Watches the popperOptions prop to update internal popper instance.
       */
      popperOptions(): void {
        this.popperInstance?.setOptions(this.mergedPopperOptions);
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      setTimeout(() => { // Delay popper create, since it won't be visible initially anyway.
        this.createPopperInstance();
      }, 500);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      const { tooltip } = this;

      tooltip?.removeEventListener('mouseenter', this.clearDebounce);
      tooltip?.removeEventListener('mouseleave', this.onMouseLeave);
      this.popperInstance?.destroy();
    },
    // unmounted() {},

    methods: {
      /**
       * Creates a new popper instance for the current component instance.
       */
      createPopperInstance(): void {
        const { tooltip } = this;

        if (!tooltip) {
          return;
        }

        tooltip.addEventListener('mouseenter', this.clearDebounce);
        tooltip.addEventListener('mouseleave', this.onMouseLeave);

        this.popperInstance = createPopper(this.$el, this.tooltip, this.mergedPopperOptions);
      },

      /**
       * Clears the mouseLeaveDebounce for the tooltip.
       */
      clearDebounce(): void {
        if (this.mouseLeaveDebounce) {
          clearTimeout(this.mouseLeaveDebounce);
        }
      },

      /**
       * Enables the event listener for the popper instance.
       */
      enableEventListeners(enabled = true): void {
        this.popperInstance?.setOptions(options => ({
          ...options,
          modifiers: [
            ...options.modifiers || [],
            { name: 'eventListeners', enabled },
          ],
        }));
      },

      /**
       * Handles the mouseenter event of the toggle.
       */
      onMouseEnter(): void {
        const { tooltip } = this;

        this.clearDebounce();
        this.enableEventListeners();
        this.popperInstance?.update();
        tooltip?.classList.add(CLASS_TOOLTIP_WRAPPER_ACTIVE);

        this.$nextTick(() => {
          tooltip?.classList.add(CLASS_TOOLTIP_WRAPPER_VISIBLE);
        });
      },

      /**
       * Handles the mouseleave event of the toggle.
       */
      onMouseLeave(): void {
        this.clearDebounce();

        this.mouseLeaveDebounce = setTimeout(() => {
          const { tooltip } = this;

          tooltip.addEventListener('transitionend', () => {
            tooltip?.classList.remove(CLASS_TOOLTIP_WRAPPER_ACTIVE);
          }, { once: true });

          tooltip?.classList.remove(CLASS_TOOLTIP_WRAPPER_VISIBLE);

          this.enableEventListeners(false);
        }, DEBOUNCE_CLOSE);
      },

      /**
       * Refreshes the popper if images did load inside of it.
       */
      onLoad(): void {
        this.popperInstance?.update();
      },
    },
    // render() {},
  });
</script>

<style lang="scss" src="./styles/styles.scss"></style>
