<template>
  <div :class="b()">
    <!-- @slot Use this for multiple c-collapsible items -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  /**
   * Wrapper for multiple (c-collapse) items.
   */
  export default defineComponent({
    name: 'c-collapse-group',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines if items can be open simultaneously
       */
      oneActive: {
        type: Boolean,
        default: true,
      }
    },
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    mounted(): void {
      /**
       * Emits toggled event
       */
      this.$eventBus.$on('c-collapse.toggled', (payload: any) => {
        const collapseComponent = payload.component; // child

        /**
         * Receives update from child and emits update to EventBus
         *
         * @event   c-collapse-group.toggle
         * @type      {object}  payload
         * @property  {object}  payload.component         Current c-collapse-group instance
         * @property  {object}  payload.toggleCollapse    Component instance of original event
         */
        if (this.$el.contains(collapseComponent.$el) && this.oneActive) {
          this.$eventBus.$emit('c-collapse-group.toggle', { component: this, toggledCollapse: collapseComponent });
        }
      });
    },
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
</script>

