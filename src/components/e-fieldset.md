### Fieldset

#### Default

```vue

<template>
  <e-fieldset>
    <e-label name="Label" position="top">
      <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
    </e-label>
    <e-label name="Label" position="top">
      <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
    </e-label>
  </e-fieldset>
</template>
<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```
#### With legend
```vue

<template>
  <e-fieldset legend="Sample legend">
    <e-label name="Label" position="top">
      <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
    </e-label>
    <e-label name="Label" position="top">
      <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
    </e-label>
  </e-fieldset>
</template>
<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```
