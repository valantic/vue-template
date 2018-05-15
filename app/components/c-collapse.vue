<template>

  <div :class="b(modifiers)">
    <div :class="b('toggle')" @click="toggleState">
      <e-icon :class="b('icon')" :inline="true" icon="i-plus"/>
      {{ title }}
    </div>

    <div :class="b('content')" :style="isExpanded && { 'max-height': maxHeight }">
      <div ref="content" :class="b('inner')">
        <!-- @slot Used for item content -->
        <slot></slot>
      </div>
    </div>

  </div>

</template>

<script>
  import EventBus from '@/setup/event-bus';

  /**
   * Displays collapsible content panels. Use **c-collapse-group** as a wrapper for multiple items
   * and if only one item should be open at the same time (:one-active=true).
   */
  export default {
    name: 'c-collapse',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Sets state of the item
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines if the item has a grey background
       */
      background: {
        type: Boolean,
        default: true,
      },

      /**
       * Defines if inner content has padding left/right
       *
       *
       */
      padding: {
        type: Boolean,
        default: true,
      },

      /**
       * Title of the toggle item
       */
      title: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        isExpanded: this.$props.active,
        maxHeight: '',
      };
    },

    computed: {
      /**
       * Sets modifier classes depending on props
       *
       * @returns   {object}  modifiers   Modifier BEM classes
       */
      modifiers() {
        return {
          background: this.$props.background,
          expanded: this.isExpanded,
          padding: this.$props.padding,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      /**
       * Listens if c-collapse-group (parent) has received event and emitted back
       */

      EventBus.$on('c-collapse-group.toggle', (payload) => {
        const toggledElement = payload.toggledCollapse;
        const toggleGroup = payload.component;

        // close all items except toggled if 'one-active=true'
        if (toggleGroup.$el.contains(this.$el) && this !== toggledElement && toggleGroup.$props.oneActive) {
          this.isExpanded = false;
        }
      });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Togles state and emits event to EventBus
       */
      toggleState() {
        this.isExpanded = !this.isExpanded; // toggle state

        /**
         * Emits toggled event to EventBus
         *
         * @event c-collapse.toggled
         * @type {object}
         */
        EventBus.$emit('c-collapse.toggled', { component: this });

        /**
         * Calculate set content height of clicked item
         */
        if (this.maxHeight) {
          // make sure container receives previous height (important for smooth animation)
          this.$refs.content.parentElement.style.maxHeight = this.maxHeight;
        }
        this.setContentHeight();
      },

      /**
       * Calculates max-height of inner content
       */
      setContentHeight() {
        const contentHeight = this.$refs.content.clientHeight;

        this.maxHeight = `${contentHeight}px`;

        // remove style attribute after animation
        setTimeout(() => {
          this.$refs.content.parentElement.removeAttribute('style');
        }, 500);
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-collapse {
    border-top: 1px solid $color-grayscale--600;
    font-family: $font-family--primary;

    &:last-child {
      border-bottom: 1px solid $color-grayscale--600;
    }

    &__toggle {
      @include font($font-size--16, 40px);

      color: $color-grayscale--400;
      cursor: pointer;
      height: 40px;
      overflow-y: hidden;
      padding: 0 $spacing--10 0 $spacing--30;
      position: relative;
      text-overflow: ellipsis;
      transition: color 0.1s;
      white-space: nowrap;

      &::after {
        border-bottom: 1px solid $color-primary--1;
        bottom: 0;
        left: 0;
        content: "";
        position: absolute;
        transition: width 0.3s ease;
        width: 0;
      }

      &:hover {
        color: $color-secondary--1;
      }

      .c-collapse--expanded & {
        color: $color-secondary--1;
        transition: color 0.3s;

        &::after {
          width: 100%;
        }
      }
    }

    &__icon {
      left: $spacing--10;
      position: absolute;
      transition: transform 0.15s ease;

      svg {
        height: 12px;
        width: 12px;
      }

      path {
        fill: $color-grayscale--400;
      }

      .c-collapse--expanded & {
        transform: rotate(45deg);
      }
    }

    &__content {
      @include font($font-size--14, 18px);

      color: $color-grayscale--200;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;

      .c-collapse--background & {
        background: $color-grayscale--700;
      }

      .c-collapse--expanded & {
        max-height: none;
      }
    }

    &__inner {
      padding: $spacing--10 0 $spacing--10 0;

      .c-collapse--padding & {
        padding: $spacing--10 $spacing--10 $spacing--10 $spacing--30;
      }
    }
  }
</style>
