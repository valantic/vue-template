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

### Multiple nested modals
**Note**: For nested modals you need to define a "portal-target" for each level. This can be defined in the l-default component.

`
<portal-target name="modal-container-2" multiple />
`

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open 1st modal</e-button>
    <c-modal :open="exampleModalIsOpen" title="I'm a modal!" @close="exampleModalIsOpen = false">
      hello World..
      <img src="https://dummyimage.com/600x400/000/fff" alt="">
      <div>
        <e-button @click="innerModalIsOpen = true">Open 2nd modal</e-button>
      </div>
      <c-modal :open="innerModalIsOpen" 
               title="I'm the inner modal"
               portal-target="modal-container-2"
               @close="innerModalIsOpen = false">
        Inner Modal...
      </c-modal>
    </c-modal>
    <portal-target name="modal-container-2" multiple />
  </div>
</template>
<script>
  export default {
    name: 'example',
    data() {
      return {
        exampleModalIsOpen: false,
        innerModalIsOpen: false,
      };
    },
  };
</script>
```