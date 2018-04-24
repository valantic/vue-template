<template>
  <div :class="b()">
    <l-default>

      <!-- product detail goes here-->
      <c-product-detail/>

      <!-- getter demo only -->
      <pre>{{ products }}</pre>

    </l-default>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import lDefault from '@/components/l-default';
  import cProductDetail from '@/components/c-product-detail';

  export default {
    name: 'product-detail',
    components: {
      lDefault,
      cProductDetail
    },
    computed: {
      ...mapGetters({
        products: 'product/getProducts'
      })

    }
  };
</script>

<style lang="scss">

</style>
