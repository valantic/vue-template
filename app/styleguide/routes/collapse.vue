<template>
  <div :class="b()">
    <h1>Accordion example (c-collapse)</h1>

    <p>For the accordion the following plugin is used:
      <a href="https://roszpun.github.io/vue-collapse/#/"
         target="_blank">vue2-collapse
      </a>
    </p>

    <v-collapse-group>
      <c-collapse
        v-for="(item, index) in collapsible"
        :key="index"
        :title="item.title"
        :active="true">
        {{ item.content }}
      </c-collapse>
    </v-collapse-group>

  </div>
</template>

<script>
  import CCollapse from '@/components/c-collapse';

  export default {
    name: 'collapse',
    components: {
      CCollapse
    },
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
