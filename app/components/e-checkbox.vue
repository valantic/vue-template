<template>
  <div :class="b()">

    <input v-model="checked" type="checkbox"> {{ checked }}

  </div>
</template>

<script>
  export default {
    name: 'e-checkbox',
    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        checked: false
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .e-checkbox {
  }
</style>
