### e-multiselect

```vue
<template>
  <div>
    <e-checkbox v-model="hasSearch" name="hasSearch" value="true">hasSearch</e-checkbox>
    <e-checkbox v-model="disabled" name="disabled" value="true">disabled</e-checkbox>
    <e-checkbox v-model="progress" name="progress" value="true">progress</e-checkbox>
    <hr style="margin: 50px 0;">
    <div style="max-width: 300px;">
      <e-multiselect v-model="selection" 
                     :options="multiSelectOptions"
                     :has-search="hasSearch"
                     :progress="progress"
                     :disabled="disabled"
      />
    </div>
    <hr style="margin: 50px 0;">
    <h3>Data:</h3>
    <pre>
      <small>
        {{ selection }}
      </small>
    </pre>
  </div>
</template>
<script>
  import { random, lorem } from 'faker';
  
  export default {
    name: 'e-multiselect-example',
    data() {
      return {
        selection: [],
        hasSearch: false,
        disabled: false,
        progress: false,
        multiSelectOptions: new Array(10).fill(null).map(() => ({
          value: random.uuid(),
          label: lorem.words(4),
        })),
      };
    },
  }
</script>
```
