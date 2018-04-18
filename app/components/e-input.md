#### `default`
```
<template>
  <div>
  
    <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
    
    <!-- demo only -->
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
<e-input hover name="demo" placeholder="..."/>
```


#### `:focus`
```
<e-input focus name="demo" placeholder="..."/>
```

#### state: `error`
```
<e-input state="error" name="demo" placeholder="..."/>
```

#### state: `success`
```
<e-input state="success" name="demo" placeholder="..."/>
```

#### state: `info`
```
<e-input state="info" name="demo" placeholder="..."/>
```
