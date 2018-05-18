<template>
  <ul :class="b('')">
    <li v-for="(value, index) in items" :class="b('item')" :key="index">
      <a :class="b('link')"
         :href="value"
         target="_blank"
      >
        {{ value }}
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'c-linklist',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the items, displayed in the list.
       */
      items: {
        type: Object,
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
  .c-linklist {
    list-style-type: none;
    padding-left: $spacing--0;

    &__link {
      padding-left: $spacing--0;
    }
  }
</style>
