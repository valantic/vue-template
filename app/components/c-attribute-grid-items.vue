<template>
  <dl :class="b()">
    <template v-for="(item, index) in items">
      <dt :key="`dt-${index}`" :class="b('col-dt', { emphasis: item.emphasis })">{{ item.key }}</dt>
      <dd :key="`dd-${index}`" :class="b('col-dd', { emphasis: item.emphasis })">
        <a
          v-if="item.url"
          :class="b('link')"
          :href="item.url"
          title=""
        >{{ item.value }}</a>
        <span v-else :class="b('value')">{{ item.value }}</span>
      </dd>
    </template>
  </dl>
</template>

<script>
  export default {
    name: 'c-attribute-grid-items',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the items displayed in the definition list
       */
      items: {
        type: Array,
        required: true,
      },
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
  .c-attribute-grid-items {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;

    &__col-dt {
      width: 50%;
    }

    &__col-dd {
      margin-left: auto;
      width: 50%;
    }

    &__col-dt,
    &__col-dd {
      @include font($font-size--14, 18px, $font-weight--regular);

      font-family: $font-family--primary;
      color: $color-grayscale--200;
      text-align: left;
      padding: 0 $spacing--10;
      margin-bottom: $spacing--10;
    }

    &__col-dt--emphasis,
    &__col-dd--emphasis {
      @include font($font-size--14, 18px, $font-weight--bold);
    }

    &__value {
      color: $color-grayscale--400;
    }

    &__link {
      padding: $spacing--0;
    }
  }
</style>
