<template>

  <v-collapse-wrapper :class="b({expanded: isExpanded})">

    <div v-collapse-toggle :class="b('toggle')" @click="setState">
      {{ title }}
    </div>

    <div v-collapse-content :class="b('content')">
      <slot></slot>
    </div>

  </v-collapse-wrapper>

</template>

<script>
  export default {
    name: 'c-collapse',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Title of the toggle
       */
      title: {
        type: String,
        required: true,
      }
    },

    data() {
      return {
        isExpanded: false
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Sets and emits the current state
       */
      setState() {
        this.isExpanded = !this.isExpanded; // toggle state
        this.$emit('toggle-state', this.isExpanded); // listens to @toggle-state
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-collapse {
    // ...
  }
</style>
