<template>
  <div :class="b()">
    <h1>Accordion example (c-collapse)</h1>

    <p>For the accordion the following plugin is used:
      <a href="https://roszpun.github.io/vue-collapse/#/"
         target="_blank">vue2-collapse
      </a>
    </p>

    <!-- TODO use 'item.id' instead of index if possible => :key="item.id" -->
    <c-collapse
      v-for="(item, index) in collapsible"
      :active="item.active"
      :key="item.index"
      :ref="`el-${index}`"
      :title="item.title">
      {{ item.content }}
    </c-collapse>

  </div>
</template>

<script>
  import CCollapse from '@/components/c-collapse';

  export default {
    name: 'collapse',
    components: {
      CCollapse
    },
    replace: true,
    data() {
      return {
        collapsible: this.$store.getters['product/getCollapsible']
      };
    },
  };
</script>

<style lang="scss">
  .collapse {
    padding: $spacing--50;
  }
</style>
