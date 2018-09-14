### c-date-picker-input
```vue
<template>
  <c-date-picker-input :selected-date="selectedDate" @input="onInputDate"/>
</template>

<script>
  export default {
    data () {
      return {
        selectedDate: '',
      };
    },
    methods: {
      onInputDate({ date }) {
       this.selectedDate = date;
      }
    }
  };
</script>
```
