<template>
  <ul :class="b('list')">
    <li v-for="item in items" :class="b('item')" :key="item.key">
      <a :class="b('link')" :href="item.value" :title="item.key">
        {{ item.key }}
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'c-linklist',
    // components: {},
    // mixins: [],

    /**
     * Defines the items, displayed in the list.
     */
    props: {
      items: {
        type: Array,
        required: true
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
  .c-linklist__list {
    list-style-type: none;
    padding-left: $spacing--0;
  }

  .c-linklist__link {
    padding-left: $spacing--0;
  }
</style>
