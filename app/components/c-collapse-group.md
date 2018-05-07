```
<template>

  <!-- TODO use 'item.id' instead of index if possible => :key="item.id" -->
  
  <c-collapse-group>
  
      <c-collapse
        v-for="(item, index) in collapsible"
        :key="index"
        :title="item.title">
        {{ item.content }}
      </c-collapse>
      
  </c-collapse-group>

</template>

<script>
  export default {
    name: 'collapse',
    data() {
      return {
        collapsible: this.$store.getters['product/getCollapsible']
      };
    },
  };
</script>
```
