<template>
  <dl :class="b()">
    <template v-for="(item, index) in items">
      <dt :key="`dt-${index}`" :class="b('col-dt', { emphasis: item.emphasis })">{{ item.key }}</dt>
      <dd :key="`dd-${index}`" :class="b('col-dd', { emphasis: item.emphasis })">
        <a v-if="item.url" :href="item.url">{{ item.value }}</a>
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

    &__col-dt {
      width: 50%;
    }

    &__col-dd {
      margin-left: auto;
      width: 50%;
    }

    &__col-dt,
    &__col-dd {
      @include font($font-size--14, 23, $font-weight--regular);

      font-family: $font-family--primary;
      color: $color-grayscale--200;
      text-align: left;
      padding: 0 $spacing--10;
    }

    &__col-dt--emphasis,
    &__col-dd--emphasis {
      @include font($font-size--14, 23, $font-weight--bold);

      color: $color-grayscale--200;
    }

    &__col-dd--emphasis {
      color: $color-grayscale--400;
    }

    &__key {
      color: $color-grayscale--200;
    }

    &__value {
      color: $color-grayscale--400;
    }
  }
</style>
