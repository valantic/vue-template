<template>
  <div :class="b()">
    <h1>Accordion example (c-collapse)</h1>

    <!-- TODO use 'item.id' instead of index if possible => :key="item.id" -->
    <c-collapse-group>

      <c-collapse
        v-for="(item, index) in collapsible"
        :active="item.active"
        :key="index"
        :title="item.title">
        {{ item.content }}
      </c-collapse>

    </c-collapse-group>

  </div>
</template>

<script>
  import CCollapseGroup from '@/components/c-collapse-group';
  import CCollapse from '@/components/c-collapse';

  export default {
    name: 'collapse',
    components: {
      CCollapseGroup,
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
