<template>
  <div :class="b()">
    <!-- @slot Use this for multiple c-collapsible items -->
    <slot></slot>
  </div>
</template>

<script>
  import EventBus from '@/setup/event-bus';

  export default {
    name: 'c-collapse-group',
    // components: {},
    // mixins: [],

    props: {
      /**
       * If only one item is active
       */
      oneActive: {
        default: false,
        type: Boolean,
      }
    },
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      /**
       * Emits toggled event
       *
       * @returns   {object}  payload   Child component
       */
      EventBus.$on('c-collapse.toggled', (payload) => {
        const collapseComponent = payload.component; // child

        /**
         * Emits update to EventBus
         *
         * @event   c-collapse-group.toggle
         * @type {object}   collapseElement   Toggled child element
         */
        if (this.$el.contains(collapseComponent.$el)) {
          EventBus.$emit('c-collapse-group.toggle', { component: this, toggledCollapse: collapseComponent });
        }
      });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {}, // TODO $off
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .c-collapse-group {
    // ...
  }
</style>
