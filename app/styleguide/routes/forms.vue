<template>
  <div :class="b()">
    <h1>Form example</h1>

    <h2>e-input</h2>
    <p>excluding label</p>
    <form>
      first name: <e-input v-model="name.firstname" name="firstname" placeholder="..." />
      last name: <e-input v-model="name.lastname" name="lastname" placeholder="..." />
      <p v-if="name.firstname && name.lastname">Your name is: <strong>{{ name.firstname }} {{ name.lastname }}</strong></p>
      <pre>{{ name }}</pre>
    </form>
  </div>
</template>

<script>
  import EInput from '@/components/e-input';

  export default {
    name: 'forms',
    components: {
      EInput
    },
    data() {
      return {
        name: {
          firstname: '',
          lastname: '',
        }
      };
    }
  };
</script>

<style lang="scss">
  // demo only
  .forms {
    padding: $spacing--50;
  }
</style>
