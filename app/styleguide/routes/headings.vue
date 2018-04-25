<template>
  <div :class="b()">
    <div :class="b('examplecontainer')">
      <h1>Headings</h1>
      <div :class="b('examplebox')">
        <e-heading
          tag-name="h1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>

      <h1>Headings with underline</h1>
      <div :class="b('examplebox')">
        <e-heading
          tag-name="h1"
          underline>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h2"
          underline>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h3"
          underline>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h4"
          underline>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h5"
          underline>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h6"
          weight="normal"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
      </div>

      <h1>Headings with links</h1>
      <div :class="b('examplebox')">
        <e-heading
          tag-name="h1"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h2"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h3"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h4"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h5"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h6"
          weight="normal"
          underline>
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
      </div>
    </div>
  </div>
</template>

<script>
  import LDefault from '@/components/l-default';
  import EHeading from '@/components/e-heading';

  export default {
    name: 'headings',
    components: {
      LDefault,
      EHeading
    },

    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .headings {
    &__examplecontainer {
      margin: $spacing--30;
    }
    &__examplebox {
      margin: $spacing--30 $spacing--0;
    }
  }
</style>
