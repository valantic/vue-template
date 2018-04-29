<template>
  <div :class="b('spacing')">
    <h1>Attributegrid</h1>
    <c-attributegrid :attributes="[{'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue', url: 'http://www.google.com'}]"></c-attributegrid>
    <h1 :class="b('secondheadline')">Attributegrid with headline</h1>
    <c-attributegrid :attributes="[{'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue', url: 'http://www.google.com'}]" headline></c-attributegrid>
  </div>
</template>

<script>
  import CAttributegrid from '@/components/c-attributegrid';

  export default {
    name: 'attributegrid',
    components: { CAttributegrid },
  };
</script>

<style lang="scss">
  .attributegrid {
    &__spacing {
      padding: $spacing--40
    }
    &__secondheadline {
      margin-top: $spacing--20
    }
  }
</style>