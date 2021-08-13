### e-radio

Always use **v-model** to bind value to form elements!

```vue
<template>
  <div>
    <e-radio v-for="item in items"
             :key="item.id"
             :name="name" 
             :value="item.value"
             v-model="selected"
             style="margin-bottom: 10px;">
      {{ item.displayName }}
    </e-radio>
  
    <div style="margin-top: 15px;">
      <p>{{ selected }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      selected: 'radio-2',
      name: 'radio-1',
      items: [
        {id: 1, value: 'radio-1', displayName: 'Radio 1'},
        {id: 2, value: 'radio-2', displayName: 'Radio 2'},
        {id: 3, value: 'radio-3', displayName: 'Radio 3'}
      ],
    })
  });
</script>
```

#### `:disabled`
```vue
<template>
  <div>
  {{name}}
    <e-radio disabled 
           v-for="item in items"
           :key="item.id"
           :name="name" 
           :value="item.value" 
           v-model="selected"
           style="margin-bottom: 10px;">
       {{ item.displayName }}
    </e-radio>
  </div>
</template>
    
<script>
  export default defineComponent({
    data: () => ({
      selected: 'radio-1',
      name: 'radio-2',
      items: [
        {id: 1, value: 'radio-1', displayName: 'Radio 1'},
        {id: 2, value: 'radio-2', displayName: 'Radio 2'},
      ],
    })
  });
</script>
```

#### `:hover`
```vue
<template>
  <div>
    <e-radio hover 
             name="example-radio-hover" 
             value="radio-1" 
             v-model="demo">
      Select Radio Button
    </e-radio>
  
    <div style="margin-top: 15px;">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### `:focus`
```vue
<template>
  <div>
    <e-radio focus 
             v-model="demo" 
             name="example-radio-focus" 
             value="radio-1">
      Select Radio Button
    </e-radio>
  
    <div style="margin-top: 15px;">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      demo: ''
    })
  });
</script>
```
