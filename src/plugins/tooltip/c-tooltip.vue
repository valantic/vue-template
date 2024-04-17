<template>
  <component
    :is="rootElement"
    :class="b()"
    @mouseenter="showTooltip"
    @mouseleave="tooltipVisible = false"
  >
    <!-- @slot The slot for the tooltips anchor element(s). -->
    <slot></slot>

    <!-- Moves tooltip to a portal to prevent invalid HTML nesting. -->
    <Teleport to="body">
      <transition :name="b('transition', { fade: true })">
        <div
          v-if="tooltipInitialized"
          v-show="tooltipVisible"
          ref="tooltip"
          :class="b('tooltip-wrapper', { component: true })"
          @load.capture="updatePopperInstance"
          @mouseenter="tooltipVisible = true"
          @mouseleave="tooltipVisible = false"
        >
          <div :class="b('tooltip')">
            <!-- @slot This slot will be used for the tooltip content. -->
            <slot name="tooltip"></slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </component>
</template>

<script lang="ts">
  import { Instance, Options, createPopper } from '@popperjs/core';
  import { PropType, Ref, defineComponent, ref } from 'vue';
  import { BEM_BLOCK_NAME, DEFAULT_POPPER_OPTIONS } from '@/plugins/tooltip/shared';

  type Setup = {
    tooltip: Ref<HTMLDivElement>;
  };

  type Data = {
    popperInstance: Instance | null;
    tooltipInitialized: boolean;
    tooltipVisible: boolean;
  };

  /**
   * Renders a tooltip for the elements inside its slot.
   */
  export default defineComponent({
    name: BEM_BLOCK_NAME,

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

      /**
       * Allows to disable the tooltip.
       */
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    // emits: {},

    setup(): Setup {
      const tooltip = ref();

      return {
        tooltip,
      };
    },
    data(): Data {
      return {
        popperInstance: null,
        tooltipInitialized: false,
        tooltipVisible: false,
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

      /**
       * Creates or updates the popper instance when the visibility changes.
       */
      tooltipVisible(visible): void {
        this.createPopperInstance();
        this.enableEventListeners(visible);
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      this.popperInstance?.destroy();
    },
    // unmounted() {},

    methods: {
      /**
       * Creates a new popper instance for the current component instance.
       */
      createPopperInstance(): void {
        const { tooltip, popperInstance } = this;

        if (popperInstance || !tooltip) {
          return;
        }

        this.popperInstance = createPopper(this.$el, this.tooltip, this.mergedPopperOptions);
      },

      /**
       * Enables the event listener for the popper instance.
       */
      enableEventListeners(enabled = true): void {
        this.popperInstance?.setOptions((options) => ({
          ...options,
          modifiers: [
            ...(options.modifiers || []),
            { name: 'eventListeners', enabled }, // Auto observes scroll and resize events.
          ],
        }));
      },

      /**
       * Handles the mouseenter event of the toggle.
       */
      showTooltip(): void {
        if (this.disabled) {
          return;
        }

        this.tooltipInitialized = true;

        this.$nextTick(() => {
          this.tooltipVisible = true;
        });
      },

      /**
       * Refreshes the popper if images did load inside of it.
       */
      updatePopperInstance(): void {
        this.popperInstance?.update();
      },
    },
    // render() {},
  });
</script>

<style lang="scss" src="./styles/styles.scss"></style>
