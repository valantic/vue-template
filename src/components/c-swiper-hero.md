### Hero swiper

```vue
<template>
  <c-swiper-hero :images="images"/>
</template>
  
<script>
  export default defineComponent({
    data() {
      return {
        images: [
          {
            imageUrl: 'https://via.placeholder.com/1600x500',
            fallback: 'https://via.placeholder.com/1600x500',
            href: 'https://www.google.ch',
          },
          {
            imageUrl: 'https://via.placeholder.com/1600x500',
            fallback: 'https://via.placeholder.com/1600x500',
            href: 'https://www.valantic.com',
          },
          {
            imageUrl: 'https://via.placeholder.com/1600x500',
            fallback: 'https://via.placeholder.com/1600x500',
            href: 'https://www.github.com',
          },
        ],
      }
    }
  }
</script>
```
