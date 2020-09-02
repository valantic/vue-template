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
            fallback: '//via.placeholder.com/500',
            srcset: {
              500: '//via.placeholder.com/500',
              800: '//via.placeholder.com/800',
              1200: '//via.placeholder.com/1200'
            },
            alt: ''
          },
          {
            fallback: '//via.placeholder.com/500',
            srcset: {
              500: '//via.placeholder.com/500',
              800: '//via.placeholder.com/800',
              1200: '//via.placeholder.com/1200'
            },
            alt: ''
          },
          {
            fallback: '//via.placeholder.com/500',
            srcset: {
              500: '//via.placeholder.com/500',
              800: '//via.placeholder.com/800',
              1200: '//via.placeholder.com/1200'
            },
            alt: ''
          }]
      }
    },
  };
</script>
```
