### Position top
```
<template>
  <div>
  
  <e-label name="Label" position="top">
     <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
  </e-label>
  
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

### Position bottom
```
<template>
  <div>
  
  <e-label name="Label" position="bottom">
     <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
  </e-label>
  
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

### Position left
```
<template>
  <div>
  
  <e-label name="Label" position="left">
     <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
  </e-label>
  
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

### Position right
```
<template>
  <div>
  
  <e-label name="Label" position="right">
     <e-input v-model="demo" name="demo" placeholder="enter text..."/> 
  </e-label>
  
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

### :disabled
```
<template>
  <div>
  
  <e-label name="Label" position="top" disabled>
     <e-input v-model="demo" name="demo" placeholder="enter text..." disabled/> 
  </e-label>
  
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

### state:error
```
<template>
  <div>
  
  <e-label name="Label" position="top" state="error">
     <e-input v-model="demo" name="demo" placeholder="enter text..." state="error"/> 
  </e-label>
  
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
