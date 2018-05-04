<template>
  <div :class="b()">
    <h1>Form example</h1>

    <h2>e-input</h2>
    <p>including e-label</p>
    <form>
      <e-label name="First name:" position="top">
        <e-input v-model="name.firstName" name="firstname" placeholder="..." />
      </e-label>
      <e-label name="Last name:" position="left">
        <e-input v-model="name.lastName" name="lastname" placeholder="..." />
      </e-label>
      <p>Your name is: <strong>{{ name.firstName }} {{ name.lastName }}</strong></p>
      <pre>{{ name }}</pre>
    </form>
    <h2>c-add-to-cart</h2>
    <c-add-to-cart sku="SKU03"/>
  </div>
</template>

<script>
  import cAddToCart from '@/components/c-add-to-cart';

  export default {
    name: 'forms',
    components: {
      cAddToCart,
    },
    data() {
      return {
        name: {
          firstName: '',
          lastName: '',
        }
      };
    }
  };
</script>

<style lang="scss">
  .forms {
    padding: $spacing--50;

    .e-label {
      margin-bottom: $spacing--10;
    }
  }
</style>
