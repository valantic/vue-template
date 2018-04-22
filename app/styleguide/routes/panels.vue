<template>
  <div :class="b()">
    <l-default>

      <h2>Default</h2>
      <div :class="b('example')">
        <e-panel>
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
        </e-panel>
      </div>

      <h2>Gray border, no spacing</h2>
      <div :class="b('example')">
        <e-panel
          border="2"
          color="gray"
          heading-spacing="0"
          content-spacing="0"
        >
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
        </e-panel>
      </div>

      <h2>Small button in open state with spacings</h2>
      <div :class="b('example')">
        <e-panel
          border="1"
          triangle-button
          triangle-button-size="small"
          triangle-button-color="blue"
          triangle-button-open
        >
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
        </e-panel>
      </div>

      <h2>Yellow button with heading and spacings</h2>
      <div :class="b('example')">
        <e-panel
          border="2"
          color="yellow"
          triangle-button
          triangle-button-size="big"
          triangle-button-plus-color="blue"
          heading="A heading"
        >
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
          foo bar foo bar<br>
          <div style="background-color: #00ffff; height: 20px;"></div>
        </e-panel>
      </div>

    </l-default>
  </div>
</template>

<script>
  import LDefault from '@/components/l-default';

  export default {
    name: 'panels',
    components: { LDefault },

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

    // methods: { },
    // render() {},
  };
</script>

<style lang="scss">
  .panels {
    &__example {
      margin-bottom: $spacing--30;
    }
  }
</style>
