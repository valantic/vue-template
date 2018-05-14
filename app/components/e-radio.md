### e-radio

Always use **v-model** to bind value to form elements!

```vue
<template>
  <div>
    <e-radio id="radio-1" 
             name="example-radio-1" 
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
      demo: 'radio-1'
    })
  };
</script>
```

#### `:disabled`
```vue
    <e-radio disabled 
             id="radio-1-disabled" 
             name="example-radio-disabled" 
             label="radio-1" 
             displayName="Select Radio Button"
    />
```

#### `:hover`
```vue
<template>
  <div>
    <e-radio hover 
             id="radio-1-hover" 
             name="example-radio-hover" 
             label="radio-1" 
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
             id="radio-1-focus" 
             v-model="demo" 
             name="example-radio-focus" 
             label="radio-1" 
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


#### `:info`
```vue
<template>
  <div>
    <e-radio state="info" 
             id="radio-1-info" 
             v-model="demo" 
             name="example-radio-info" 
             label="radio-1" 
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
      demo: 'radio-1'
    })
  };
</script>
```
