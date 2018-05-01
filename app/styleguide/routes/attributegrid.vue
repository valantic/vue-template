<template>
  <div :class="b('spacing')">
    <h1>Attributegrid</h1>
    <c-attribute-grid :attributes="[{'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue', url: 'http://www.google.com'}]" />
    <h1 :class="b('secondheadline')">Attributegrid with headline which is shrinking on mobile</h1>
    <c-attribute-grid :attributes="[{'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue'}, {'name': 'Test', 'content': 'Testvalue', url: 'http://www.google.com'}]" headline shrinkOnMobile />
  </div>
</template>

<script>
  import CAttributeGrid from '@/components/c-attributegrid';

  export default {
    name: 'attributegrid',
    components: { CAttributeGrid },
  };
</script>

<style lang="scss">
  .attributegrid {
    &__spacing {
      padding: $spacing--40;
    }

    &__secondheadline {
      margin-top: $spacing--20;
    }
  }
</style>
