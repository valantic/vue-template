#### default options

```
<template>
  <div class="demo">
    <c-swiper-gallery :images="images"/>
  </div>

</template>

<script>
  export default {
    name: 'swiper',
    data() {
      return {
        images: this.$store.getters['product/images'],
      };
    },
  };
</script>
```

#### custom options

```
<template>
  <div class="demo">
    <c-swiper-gallery :images="images" :options="customOptions"/>
  </div>

</template>

<script>
  export default {
    name: 'swiper2',
    data() {
      return {
        customOptions: {
          effect: 'cube',
          cubeEffect: {
              slideShadows: false,
          },
          speed: 500
        },
        images: this.$store.getters['product/images']
      };
    },
  };
</script>
```
