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
             :display-name="item.displayName"
             class="spacing--bottom-10"
        />
  
    <div class="spacing--top-15">
      <p>{{ selected }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      selected: 'radio-2',
      name: 'radio',
      items: [
        {id: 1, value: 'radio-1', displayName: 'Radio 1'},
        {id: 2, value: 'radio-2', displayName: 'Radio 2'},
        {id: 3, value: 'radio-3', displayName: 'Radio 3'}
      ],
    })
  };
</script>
```

#### `:disabled`
```vue
<template>
  <div>
    <e-radio disabled 
           v-for="item in items"
           :key="item.id"
           :name="name" 
           :value="item.value" 
           :display-name="item.displayName"
           v-model="selected"
           class="spacing--bottom-10"
    />
  </div>
</template>
    
<script>
  export default {
    name: 'example',
    data: () => ({
      selected: 'radio-1',
      name: 'radio',
      items: [
        {id: 1, value: 'radio-1', displayName: 'Radio 1'},
        {id: 2, value: 'radio-2', displayName: 'Radio 2'},
      ],
    })
  };
</script>
```

#### `:hover`
```vue
<template>
  <div>
    <e-radio hover 
             name="example-radio-hover" 
             value="radio-1" 
             v-model="demo" 
             displayName="Select Radio Button"
    />
  
    <div class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
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

#### `:focus`
```vue
<template>
  <div>
    <e-radio focus 
             v-model="demo" 
             name="example-radio-focus" 
             value="radio-1" 
             displayName="Select Radio Button"
    />
  
    <div class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
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
