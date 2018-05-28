### Styles

#### Full

```vue
<template>
  <div>
    <c-header/>
  </div>
</template>
<script>
  export default {
    name: 'example',
  };
</script>
<style lang="scss">
  .c-header {
    position: relative;
  }
</style>
```

#### Reduced

```vue
<template>
  <div>
    <c-header state="reduced"/>
  </div>
</template>
<script>
  export default {
    name: 'example',
  };
</script>
<style lang="scss">
  .c-header {
    position: relative;
  }
</style>
```
