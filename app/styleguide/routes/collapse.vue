<template>
  <div :class="b()">
    <h1>Accordion example (c-collapse)</h1>

    <c-collapse-group :one-active="true">

      <c-collapse
        v-for="item in collapsible"
        :active="item.active"
        :key="item.id"
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
        collapsible: this.$store.getters['product/collapsible']
      };
    },
  };
</script>

<style lang="scss">
  .collapse {
    padding: $spacing--50;
  }
</style>
