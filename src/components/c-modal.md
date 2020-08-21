### Size: default

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open.sync="exampleModalIsOpen">
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

### Size: 600

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open.sync="exampleModalIsOpen"
             size="600"
    >
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

### Title

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open.sync="exampleModalIsOpen"
             title="I'm a modal!"
    >
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

### Custom header

```vue
<template>
  <div>
    <e-button @click="exampleModalIsOpen = true">open</e-button>
    <c-modal :open.sync="exampleModalIsOpen"
             title="I'm a modal!"
    >
      <template v-slot:header="data">
        <div style="padding: 20px; border-bottom: 1px solid black">
          A custom header: {{ data.title}}
        </div>
      </template>
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
    <c-modal :open.sync="exampleModalIsOpen"
             title="I'm a modal!"
    >
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
    <c-modal :open.sync="exampleModalIsOpen"
             title="I'm a modal!"
    >
      hello World..
      <img src="https://dummyimage.com/600x400/000/fff" alt="" />
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
