<template>
  <div :class="b()">
    <l-two-columns>
      <div :class="b('testmenu')" slot="left">
        ...
      </div>
      <c-productlist-wrapper slot="main"/>
    </l-two-columns>
  </div>
</template>

<script>
  import lTwoColumns from '@/components/l-two-columns';
  import cProductlistWrapper from '@/components/c-productlist-wrapper';

  export default {
    name: 'two-columns',
    components: {
      lTwoColumns,
      cProductlistWrapper,
    },
  };
</script>

<style lang="scss">

  .two-columns {
    &__testmenu {
      background-color: $color-grayscale--1000;
      box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);
      padding: $spacing--5;
    }
  }

</style>
