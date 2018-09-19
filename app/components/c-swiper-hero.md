### Hero swiper

```vue
<template>
  <c-swiper-hero :images="images"/>
</template>
  
<script>
  export default {
    data() {
      return {
        images: [
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            fallback: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            fallback: 'http://via.placeholder.com/1600x500',
            href: 'http://www.valantic.com',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            fallback: 'http://via.placeholder.com/1600x500',
            href: 'http://www.github.com',
          },
        ],
      }
    }
  }
</script>
```
