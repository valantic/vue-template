### Modal swiper

```vue
<template>
  <c-swiper-modal :images="images"/>
</template>
<script>
  export default {
    name: 'swiper-modal',
    data() {
      return {
        images: [
          {
            fallback: 'https://via.placeholder.com/500',
            srcset: {
              500: 'https://via.placeholder.com/500',
              800: 'https://via.placeholder.com/800',
              1200: 'https://via.placeholder.com/1200'
            },
            alt: ''
          },
          {
            fallback: 'https://via.placeholder.com/500',
            srcset: {
              500: 'https://via.placeholder.com/500',
              800: 'https://via.placeholder.com/800',
              1200: 'https://via.placeholder.com/1200'
            },
            alt: ''
          },
          {
            fallback: 'https://via.placeholder.com/500',
            srcset: {
              500: 'https://via.placeholder.com/500',
              800: 'https://via.placeholder.com/800',
              1200: 'https://via.placeholder.com/1200'
            },
            alt: ''
          }]
      }
    },
  };
</script>
```
