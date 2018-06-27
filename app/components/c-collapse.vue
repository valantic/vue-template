<template>

  <div :class="b(modifiers)">
    <a :class="b('toggle')" href="#" @click="toggleState">
      <e-icon :class="b('icon')" :inline="true" icon="i-plus"/>
      {{ title }}
    </a>

    <div ref="content" :class="b('content')" :style="{ maxHeight }">
      <div ref="inner" :class="b('inner')">
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
        openTimeout: null,
        closeTimeout: null,
      };
    },

    computed: {
      /**
       * Sets modifier classes depending on props.
       *
       * @returns   {Object}  modifiers   Modifier BEM classes
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
      EventBus.$on('c-collapse-group.toggle', (payload) => {
        const toggledElement = payload.toggledCollapse;
        const toggleGroup = payload.component;

        // close all items except toggled if 'one-active=true'
        if (this.isExpanded && toggleGroup.$el.contains(this.$el) && this !== toggledElement) {
          this.isExpanded = false;

          this.close();
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
       * Toggles state and emits event to EventBus.
       *
       * @param   {Object}    event   Original event
       */
      toggleState(event) {
        event.preventDefault();

        event.target.blur();

        this.isExpanded = !this.isExpanded; // toggle state

        if (this.isExpanded) {
          this.open();
        } else {
          this.close();
        }

        /**
         * Emits toggled event to EventBus
         *
         * @event     c-collapse.toggled
         * @type      {object}
         * @property  {object}   component  Current component
         */
        EventBus.$emit('c-collapse.toggled', { component: this });
      },

      /**
       * Opens the collapsible.
       */
      open() {
        this.setMaxHeight();

        clearTimeout(this.closeTimeout);

        this.openTimeout = setTimeout(() => {
          this.maxHeight = 'none';
        }, 500);
      },

      /**
       * Closes the collapsible.
       */
      close() {
        this.setMaxHeight();

        clearTimeout(this.openTimeout);

        this.closeTimeout = setTimeout(() => {
          this.maxHeight = 0;
        }, 20); // Timeout is needed because of transition
      },

      /**
       * Sets the collapsible height according to its current content.
       */
      setMaxHeight() {
        this.maxHeight = `${this.$refs.inner.clientHeight}px`;
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

      display: block;
      color: $color-grayscale--400;
      cursor: pointer;
      height: 40px;
      overflow-y: hidden;
      padding: 0 $spacing--10 0 $spacing--30;
      position: relative;
      text-overflow: ellipsis;
      transition: color 0.1s;
      white-space: nowrap;
      border-bottom: 0;

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
        border-bottom: 0;
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
      transition: max-height 0.2s ease-in-out;

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
