### c-date-picker

#### Default

```vue
<template>
  <c-date-picker v-model="selectedDate"/>
</template>

<script>
  export default {
    data () {
      return {
        selectedDate: '',
      }
    }
  };
</script>
```

#### Small

```vue
<template>
  <c-date-picker v-model="selectedDate" :is-full-width="false" />
</template>

<script>
  export default {
    data () {
      return {
        selectedDate: '',
      }
    }
  };
</script>
```
