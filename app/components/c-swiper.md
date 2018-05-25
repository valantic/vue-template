#### default options

```
<template>
  <div class="demo">
    <c-swiper :images="images"/>
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
    <c-swiper :images="images" :options="customOptions"/>
  </div>

</template>

<script>
  export default {
    name: 'swiper',
    data() {
      return {
        customOptions: {
          effect: 'cube',
          cubeEffect: {
              slideShadows: false,
          },
          speed: 1000
        },
        images: this.$store.getters['product/images']
      };
    },
  };
</script>
```
