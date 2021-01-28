<template>
  <div :class="b(modifiers)">
    <a :class="b('toggle')" href="#" @click="toggleState">
      <e-icon icon="plus"
              width="12"
              height="12" />
      {{ title }}
    </a>

    <div v-if="isRendered" :class="b('content')" :style="{ maxHeight }">
      <div ref="inner" :class="b('inner')">
        <!-- @slot Used for item content -->
        <slot :isOpen="isOpen"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import propScale from '@/helpers/prop.scale';

  /**
   * Displays collapsible content panels. Use **c-collapse-group** as a wrapper for multiple items
   * and if only one item should be open at the same time (:one-active=true).
   */
  export default {
    name: 'c-collapse',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    props: {
      /**
       * Sets state of the item.
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines the padding of the inner content.
       */
      padding: propScale(500, [
        0,
        300,
        500,
      ]),

      /**
       * Title of the toggle item.
       */
      title: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        /**
         * @type {Boolean} Defines the current state of the collapse.
         */
        isExpanded: this.$props.active,

        /**
         * @type {String|Number} The maxHeight of the content used for transition.
         */
        maxHeight: '',

        /**
         * @type {Number} The timeout for transition open the collapse.
         */
        openTimeout: null,

        /**
         * @type {Number} The timeout for the transition before it can start closing the collapse.
         */
        closeTimeout: null,

        /**
         * @type {Boolean} Defines if the collapse is currently open. This also waits until the transition is finished,
         * so that calculations depending on the height of the content can be done by the child component.
         */
        isOpen: this.$props.active,

        /**
         * @type {Boolean} Flag shows if the collapse content is already rendered in the DOM.
         */
        isRendered: false,
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
          expanded: this.isExpanded,
          open: this.isOpen,
          padding: this.$props.padding,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      this.isRendered = this.isOpen;
    },
    // beforeMount() {},
    mounted() {
      this.$eventBus.$on('c-collapse-group.toggle', (payload) => {
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
         * Emits toggled event to EventBus.
         *
         * @event     c-collapse.toggled
         * @type      {object}
         * @property  {object}   component  Current component
         */
        this.$eventBus.$emit('c-collapse.toggled', { component: this });
      },

      /**
       * Opens the collapsible.
       */
      open() {
        if (!this.isRendered) {
          this.isRendered = true;

          /**
           * Calls the function after the content is rendered in the DOM.
           */
          this.$nextTick(() => {
            this.openContent();
          });
        } else {
          this.openContent();
        }
      },

      /**
       * Sets the max-height of the content and opens the content.
       */
      openContent() {
        this.setMaxHeight();
        clearTimeout(this.closeTimeout);

        this.openTimeout = setTimeout(() => {
          this.maxHeight = 'none';
          this.isOpen = true;
        }, 300);
      },

      /**
       * Closes the collapsible.
       */
      close() {
        this.setMaxHeight();
        this.isOpen = false;

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

    &:last-child {
      border-bottom: 1px solid $color-grayscale--600;
    }

    &__toggle {
      @include font($font-size--16, 40px);

      display: block;
      color: $color-grayscale--400;
      cursor: pointer;
      height: 40px;
      overflow: hidden;
      padding: 0 $spacing--10 0 $spacing--30;
      position: relative;
      text-overflow: ellipsis;
      transition: color $transition-duration-100;
      white-space: nowrap;
      border-bottom: 0;

      &::after {
        border-bottom: 1px solid $color-primary--1;
        bottom: 0;
        left: 0;
        content: "";
        position: absolute;
        transition: width $transition-duration-300 ease;
        width: 0;
      }

      &:hover {
        color: $color-secondary--1;
        text-decoration: none;
      }

      .c-collapse--expanded & {
        transition: color $transition-duration-300;

        &::after {
          width: 100%;
        }
      }
    }

    &__content {
      @include font($font-size--14, 18px);

      max-height: 0;
      overflow: hidden;
      transition: max-height $transition-duration-200 ease-in-out;

      .c-collapse--open & {
        max-height: none;
      }
    }

    &__inner {
      .c-collapse--padding-0 & {
        padding: 0;
      }

      .c-collapse--padding-300 & {
        padding: $spacing--10 0 $spacing--10 0;
      }

      .c-collapse--padding-500 & {
        padding: $spacing--10 $spacing--10 $spacing--10 $spacing--30;
      }
    }

    &__toggle .e-icon {
      left: $spacing--10;
      position: absolute;
      transition: transform $transition-duration-200 ease;
      top: 50%;
      transform: translateY(-50%);
      transform-origin: center;

      path {
        fill: $color-grayscale--400;
      }
    }

    &--expanded &__toggle .e-icon {
      transform: translateY(-50%) rotate(45deg);
    }
  }
</style>
