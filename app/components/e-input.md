#### `default`

Always use **v-model** to bind value to form elements!

```
<template>
  <div>
  
    <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
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

#### `:disabled`
```
<e-input disabled name="demo" value="Lorem ipsum..."/>
```


#### `:hover`
```
<template>
  <div>
  
    <e-input v-model="demo" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
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
```
<template>
  <div>
  
    <e-input v-model="demo" focus name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
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

#### state: `error`
```
<template>
  <div>
  
    <e-input v-model="demo" state="error" name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
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

#### state: `success`
```
<template>
  <div>
  
    <e-input v-model="demo" state="success" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
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

#### state: `info`
```
<template>
  <div>
  
    <e-input v-model="demo" state="info" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
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
