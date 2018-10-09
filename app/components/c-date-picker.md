```vue
<template>
  <div>
    <c-date-picker v-model="selectedDate"/>
    <p><span>Selected date:</span>{{ selectedDate }}</p>
  </div>
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
