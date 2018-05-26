<template>
  <ul :class="b('')">
    <li v-for="(value, index) in items" :class="b('item')" :key="index">
      <a :class="b('link')"
         :href="value"
         :title="$t(`c-linklist.downloadTitle`)"
         :target="target"
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
      },

      /**
       * Defines the target of the link
       */
      target: {
        type: String,
        default: '_self',
        validator(value) {
          return [
            '_self',
            '_blank',
          ].includes(value);
        },
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
      overflow-wrap: break-word;
      word-wrap: break-word;
      -ms-word-break: break-all;
    }
  }
</style>
