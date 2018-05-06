<template>
  <div :class="b()">
    <h1>Form example</h1>

    <h2>e-input</h2>
    <p>excluding label</p>
    <form>
      first name: <e-input v-model="name.firstName" name="firstname" placeholder="..." />
      last name: <e-input v-model="name.lastName" name="lastname" placeholder="..." />
      <p>Your name is: <strong>{{ name.firstName }} {{ name.lastName }}</strong></p>
      <pre>{{ name }}</pre>
    </form>
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

    .e-input {
      margin-bottom: $spacing--10;
    }
  }
</style>
