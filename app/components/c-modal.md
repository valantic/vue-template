### small

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open="exampleModalIsOpen" @close="exampleModalIsOpen = false">
      hello World..
    </c-modal>
    <portal-target name="modal-container" multiple />
  </div>
</template>
<script>
  export default {
    name: 'example',
    data() {
      return {
        exampleModalIsOpen: false,
      };
    },
  };
</script>
```

### large

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open="exampleModalIsOpen" @close="exampleModalIsOpen = false" size="600">
      hello World..
    </c-modal>
  </div>
</template>
<script>
  export default {
    name: 'example',
    data() {
      return {
        exampleModalIsOpen: false,
      };
    },
  };
</script>
```

### title

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open="exampleModalIsOpen" @close="exampleModalIsOpen = false" title="I'm a modal!">
      hello World..
    </c-modal>
  </div>
</template>
<script>
  export default {
    name: 'example',
    data() {
      return {
        exampleModalIsOpen: false,
      };
    },
  };
</script>
```

### Close button inside

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open="exampleModalIsOpen" @close="exampleModalIsOpen = false" title="I'm a modal!">
      hello World..
      <div>
        <e-button @click="exampleModalIsOpen = false">Close modal here</e-button>
      </div>
    </c-modal>
  </div>
</template>
<script>
  export default {
    name: 'example',
    data() {
      return {
        exampleModalIsOpen: false,
      };
    },
  };
</script>
```