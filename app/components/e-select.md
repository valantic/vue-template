### Default

```vue
<template>
  <div>
    <e-select v-model="demo" :options-list="optionsList" name="demo-select"/>
    <p>
      {{ demo }}
    </p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          value: 'option-1',
          label: 'Option 1',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
        {
          value: 'option-3',
          label: 'Option 3',
        },
      ]
    })
  };
</script>
```
