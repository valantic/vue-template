For the accordion the following plugin is used:
[vue2-vue-collapse](https://github.com/roszpun/vue-collapse)
```
<template>

  <!-- TODO use 'item.id' instead of index if possible => :key="item.id" -->
  
  <v-collapse-group>
    <c-collapse
      v-for="(item, index) in collapsible"
      :key="index"
      :title="item.title">
      {{ item.content }}
    </c-collapse>
  </v-collapse-group>

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
