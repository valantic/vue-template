### e-input

#### `default`
```
<template>
  <div>
  
    <e-input v-model.trim="demo" name="demo" placeholder="enter text..."/> 
    
    <!-- demo only -->
    <p v-if="demo">{{demo}}</p>
  
  </div>stte
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
<e-input name="demo" placeholder="..."/>
```


#### `:active`
```
<e-input name="demo" placeholder="..."/>
```

#### `:focus`
```
<e-input name="demo" placeholder="..."/>
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



<!-- <e-input value="foo" @input="actionName" state="active" name="demo" type="text" placeholder="..."></e-input> -->
