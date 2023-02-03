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
    <portal to="tooltip">
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
    </portal>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { createPopper } from '@popperjs/core';
  import {
    BEM_BLOCK_NAME,
    CLASS_TOOLTIP_WRAPPER_ACTIVE,
    CLASS_TOOLTIP_WRAPPER_VISIBLE,
    DEBOUNCE_CLOSE,
    DEFAULT_POPPER_OPTIONS,
  } from '@/plugins/tooltip/shared';

  /**
   * Renders a tooltip for the elements inside its slot.
   *
   * NOTE: requires a <portal-target name="tooltip"> element!
   */
  export default defineComponent({
    name: BEM_BLOCK_NAME,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Allows to customize the popper instance.
       */
      popperOptions: {
        type: Object,
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

    data() {
      return {
        /**
         * @type {Object} Holds the component instance related popper instance.
         */
        popperInstance: null,

        /**
         * @type {Number} Holds a debounce timeout for the mouseleave event.
         */
        mouseLeaveDebounce: null,
      };
    },

    computed: {
      /**
       * Returns the merged default and customized popper options.
       *
       * @returns {Object}
       */
      mergedPopperOptions() {
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
      popperOptions() {
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
      const { tooltip } = this.$refs;

      tooltip?.removeEventListener('mouseenter', this.clearDebounce);
      tooltip?.removeEventListener('mouseleave', this.onMouseLeave);
      this.popperInstance?.destroy();
    },
    // destroyed() {},

    methods: {
      /**
       * Creates a new popper instance for the current component instance.
       */
      createPopperInstance() {
        const { tooltip } = this.$refs;

        if (!tooltip) {
          return;
        }

        tooltip.addEventListener('mouseenter', this.clearDebounce);
        tooltip.addEventListener('mouseleave', this.onMouseLeave);

        this.popperInstance = createPopper(this.$el, this.$refs.tooltip, this.mergedPopperOptions);
      },

      /**
       * Clears the mouseLeaveDebounce for the tooltip.
       */
      clearDebounce() {
        clearTimeout(this.mouseLeaveDebounce);
      },

      /**
       * Enables the event listener for the popper instance.
       *
       * @param {Boolean} [enabled = true] Determines if the event listeners should en- or disabled.
       */
      enableEventListeners(enabled = true) {
        this.popperInstance?.setOptions(options => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled },
          ],
        }));
      },

      /**
       * Handles the mouseenter event of the toggle.
       */
      onMouseEnter() {
        const { tooltip } = this.$refs;

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
      onMouseLeave() {
        this.clearDebounce();

        this.mouseLeaveDebounce = setTimeout(() => {
          const { tooltip } = this.$refs;

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
      onLoad() {
        this.popperInstance?.update();
      },
    },
    // render() {},
  });
</script>

<style lang="scss" src="./style.scss"></style>
