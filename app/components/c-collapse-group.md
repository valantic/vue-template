```
<template>
  
  <c-collapse-group>
  
      <c-collapse
        v-for="item in collapsible"
        :key="item.id"
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
        collapsible: this.$store.getters['product/collapsible']
      };
    },
  };
</script>
```
