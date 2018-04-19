<template>
  <div :class="b()">
    <h1>Form example</h1>

    <h2>e-input</h2>
    <p>excluding label</p>
    <form>
      first name: <e-input v-model="name.firstName" name="firstname" placeholder="..." />
      last name: <e-input v-model="name.lastName" name="lastname" placeholder="..." />
      <p v-if="name.firstName && name.lastName">Your name is: <strong>{{ name.firstName }} {{ name.lastName }}</strong></p>
      <pre>{{ name }}</pre>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'forms',
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
