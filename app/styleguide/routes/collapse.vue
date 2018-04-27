<template>
  <div :class="b()">
    <h1>Accordion example</h1>

    <p>For the accordion we use the following plugin:
      <a href="https://roszpun.github.io/vue-collapse/#/"
         target="_blank">vue2-collapse
      </a>
    </p>

    <v-collapse-group>
      <c-collapse
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :active="true">
        {{ item.content }}
      </c-collapse>
    </v-collapse-group>

  </div>
</template>

<script>
  import CCollapse from '@/components/c-collapse';

  export default {
    name: 'collapse',
    components: {
      CCollapse
    },
    data() {
      return {
        items: [
          {
            title: 'This is just a title',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et  ',
          },
          {
            title: 'Click me to toggle content',
            content: '<div>This is hiddend content</div>',
          },
          {
            title: 'Click me to toggle content',
            content: 'This is hiddend content',
          },
        ]
      };
    }
  };
</script>

<style lang="scss">
  .collapse {
    padding: $spacing--50;
  }
</style>
