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
            imageUrl: '//via.placeholder.com/1600x500',
            fallback: '//via.placeholder.com/1600x500',
            href: 'https://www.google.ch',
          },
          {
            imageUrl: '//via.placeholder.com/1600x500',
            fallback: '//via.placeholder.com/1600x500',
            href: 'https://www.valantic.com',
          },
          {
            imageUrl: '//via.placeholder.com/1600x500',
            fallback: '//via.placeholder.com/1600x500',
            href: 'https://www.github.com',
          },
        ],
      }
    }
  }
</script>
```
