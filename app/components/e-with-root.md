
```vue
<template>
 <div>
    <div>
    {{showRoot}}
      <e-with-root :show-root="showRoot">
        <a href="https://www.google.com">
          <span>
            Text or link, depending on the toggle. <br />
            Link: {{ showRoot }}
          </span>
        </a>
      </e-with-root>
    </div>
    <div>
      <e-button @click="showRoot = !showRoot">Toggle showRoot</e-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'with-root-example',
    data: () => ({
      showRoot: false
    })
  };
</script>
```
