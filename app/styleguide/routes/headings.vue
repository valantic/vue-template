<template>
  <div v-bem>
    <div v-bem:example-container>
      <h1>Headings</h1>
      <div v-bem:example-box>
        <e-heading
          tag-name="h1"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h2"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h3"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h4"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h5"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h6"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>

      <h1>Headings with underline</h1>
      <div v-bem:example-box>
        <e-heading
          tag-name="h1"
          underline
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h2"
          underline
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h3"
          underline
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h4"
          underline
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h5"
          underline
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag-name="h6"
          font-weight="normal"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
      </div>

      <h1>Headings with links</h1>
      <div v-bem:example-box>
        <e-heading
          tag-name="h1"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h2"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h3"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h4"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h5"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag-name="h6"
          font-weight="bold"
          underline
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
      </div>
    </div>
  </div>
</template>

<script>
  import eHeading from '@/components/e-heading';

  export default {
    name: 'headings',
    components: {
      eHeading
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
    &__example-container {
      margin: $spacing--30;
    }

    &__example-box {
      margin: $spacing--30 $spacing--0;
    }
  }
</style>
