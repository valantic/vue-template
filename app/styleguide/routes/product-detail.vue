<template>
  <div :class="b()">
    <l-default>
      <c-product-detail/>
    </l-default>
  </div>
</template>

<script>
  import lDefault from '@/components/l-default';
  import cProductDetail from '@/components/c-product-detail';

  export default {
    name: 'product-detail',
    components: {
      lDefault,
      cProductDetail
    },
  };
</script>
