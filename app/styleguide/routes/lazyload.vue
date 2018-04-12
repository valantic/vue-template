<template>
  <div :class="b()">
    <h1>Lazyload</h1>

    <div
      v-for="item in items"
      :key="item.key"
      :class="b('item')">
      <e-picture
        :srcset="item.srcset"
        :sizes="item.sizes"
        :fallback="item.fallback"
        alt="an image"
        inline="true"/>
    </div>
  </div>
</template>

<script>
  const srcset = {
    180: 'http://via.placeholder.com/180x150',
    350: 'http://via.placeholder.com/360x300',
  };
  const sizes = {
    0: 100,
    720: 350,
  };
  let numberOfItems = 1000;

  export default {
    name: 'lazyload',
    data: () => {
      const items = [];

      while (numberOfItems > 0) {
        items.push({
          fallback: 'http://via.placeholder.com/180x150/0000ff',
          key: numberOfItems,
          srcset,
          sizes
        });

        numberOfItems -= 1;
      }

      return { items };
    }
  };
</script>

<style lang="scss">
  .lazyload {
    &__item {
      width: 180px;
      height: 150px;
      border: 1px dotted $color-grayscale--400;
      float: left;
    }
  }
</style>
