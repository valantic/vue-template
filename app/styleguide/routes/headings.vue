<template>
  <div :class="b()">
    <div class="__example">
      <h2>Headings</h2>

      <h3>Headings</h3>
      <div>
        <e-heading
          :underline="false"
          tag-name="h1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          :underline="false"
          tag-name="h2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          :underline="false"
          tag-name="h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          :underline="false"
          tag-name="h4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          :underline="false"
          tag-name="h5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          :underline="false"
          tag-name="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>

      <h3>Headings with underline</h3>
      <div>
        <e-heading
          tag-name="h1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          tag-name="h2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          tag-name="h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          tag-name="h4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          tag-name="h5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>
      <div>
        <e-heading
          tag-name="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
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
    &__example {
      margin-bottom: $spacing--30;
    }
  }
</style>
