### Message schema

See Confluence page for "Messages" for more details.

````json
{
  "type": "String",
  "code": "String",
  "source": {
    "field": "String",
  },
  "message": "String",
  "meta": {
    "id": "String",
    "confirmationType": "String",
    "hideMessage": "Boolean"
  }  
}
````

### Status types

#### Success

```vue
<template>
  <c-notification :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'success',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
        }
      }
    }
  }
</script>
```

#### Error

```vue
<template>
  <c-notification :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'error',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
        }
      }
    }
  }
</script>
```

#### Warning

```vue
<template>
  <c-notification :notification="notification"/>
</template>

<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'warning',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
        }
      }
    }
  }
</script>
```

#### Info

```vue
<template>
  <c-notification :notification="notification"/>
</template>

<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'info',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
        }
      }
    }
  }
</script>
```

### Variants

#### Confirm

```vue
<template>
  <c-notification :notification="notification"/>
</template>

<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'warning',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
          confirm: ({ resolve }) => {
            console.log('confirmed');
            resolve();
          },
        }
      }
    }
  }
</script>
```

#### Confirm & decline

```vue
<template>
  <c-notification :notification="notification" />
</template>

<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'warning',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
          confirm: ({ resolve }) => {
            console.log('confirmed');
            resolve();
          },
          decline: ({ resolve }) => {
            console.log('declined');
            resolve();
          },
        },
      }
    },
  }
</script>

```

#### Add to cart

```vue
<template>
  <c-notification :notification="notification"/>
</template>

<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'add-to-cart',
            message: 'Product is added to cart successfully',
            meta: {
              product: this.$store.getters['product/product'],
            },
          },
          id: 1,
          expire: false,
          title: '',
          confirm: false,
        }
      };
    },
  };
</script>
```

### Success (field)

```vue
<template>
  <c-notification display-type="field" :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'success',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
          confirm: true,
        },
      };
    },
  };
</script>
```

### Error (field)

```vue
<template>
  <c-notification display-type="field" :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'error',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
          confirm: true,
        },
      };
    },
  };
</script>
```

### Warning (field)

```vue
<template>
  <c-notification display-type="field" :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'warning',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
          confirm: true,
        }
      };
    },
  };
</script>
```

### Info (field)

```vue
<template>
  <c-notification display-type="field" :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'info',
            message: 'Product is added to cart successfully',
          },
          id: 1,
          expire: false,
          title: 'A title',
          confirm: true,
        }
      };
    },
  };
</script>
```

### Add to cart (field)

```vue
<template>
  <c-notification display-type="field" :notification="notification"/>
</template>
  
<script>
  export default {
    data() {
      return {
        notification: {
          message: {
            type: 'add-to-cart',
            message: 'Product is added to cart successfully',
            meta: {
              product: this.$store.getters['product/product']
            },
          },
          id: 1,
          expire: false,
          title: '',
          confirm: false,
        }
      };
    },
  };
</script>
```
