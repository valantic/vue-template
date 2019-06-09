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
            fallback: 'http://via.placeholder.com/500/0000ff',
            srcset: {
              500: 'http://via.placeholder.com/500/0000ff',
              800: 'http://via.placeholder.com/800/0000ff',
              1200: 'http://via.placeholder.com/1200/0000ff'
            },
            alt: ''
          },
          {
            fallback: 'http://via.placeholder.com/500/0000ff',
            srcset: {
              500: 'http://via.placeholder.com/500/0000ff',
              800: 'http://via.placeholder.com/800/0000ff',
              1200: 'http://via.placeholder.com/1200/0000ff'
            },
            alt: ''
          },
          {
            fallback: 'http://via.placeholder.com/500/0000ff',
            srcset: {
              500: 'http://via.placeholder.com/500/0000ff',
              800: 'http://via.placeholder.com/800/0000ff',
              1200: 'http://via.placeholder.com/1200/0000ff'
            },
            alt: ''
          }]
      }
    },
  };
</script>
```
