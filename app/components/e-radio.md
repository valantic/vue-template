### e-radio

```vue
<template>
  <div>
    <e-radio id="radio-1" v-model="demo" name="example-radio-1" value="radio-1" displayName="radio-1"/>
  
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
    <e-radio disabled id="radio-1-disabled" name="example-radio-disabled" value="radio-1" displayName="radio-1"/>
```

#### `:hover`
```vue
<template>
  <div>
    <e-radio hover id="radio-1-hover" v-model="demo" name="example-radio-hover" value="radio-1" displayName="radio-1"/>
  
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
    <e-radio focus id="radio-1-focus" v-model="demo" name="example-radio-focus" value="radio-1" displayName="radio-1"/>
  
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
    <e-radio state="info" id="radio-1-info" v-model="demo" name="example-radio-info" value="radio-1" displayName="radio-1"/>
  
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
