### c-date-picker-input

```vue
<template>
  <c-date-picker-input :selected-date="selectedDate" @input="onInputDate" :validate-date="isValidDate" />
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
      },
      isValidDate(date) {
        return this.$moment(date, 'YYYY-MM-DD', true).isValid()
          && this.$moment(date).isSameOrAfter('1920-01-01', 'year');
      },
    }
  };
</script>
```

### With year selector

```vue
<template>
  <c-date-picker-input :selected-date="selectedDate" @input="onInputDate" :validate-date="isValidDate" has-year-selector />
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
      },
      isValidDate(date) {
        return this.$moment(date, 'YYYY-MM-DD', true).isValid()
          && this.$moment(date).isSameOrAfter('1920-01-01', 'year');
      },
    }
  };
</script>
```
