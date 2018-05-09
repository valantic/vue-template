<template>
  <div :class="b()">
    <h1>Accordion example (c-collapse)</h1>

    <!-- TODO use 'item.id' instead of index if possible => :key="item.id" -->
    <c-collapse-group :one-active="true"> <!-- TODO: one active -->

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
    data() {
      return {
        // TODO rename getter
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
