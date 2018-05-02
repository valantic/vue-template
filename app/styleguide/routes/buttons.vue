<template>
  <div :class="b()">
    <l-default>
      <h2>Styles</h2>

      <h3>Default</h3>

      <div :class="b('example')">
        <e-button @click="onClick">Default</e-button>
      </div>

      <h3>Primary</h3>

      <div :class="b('example')">
        <e-button primary @click="onClick">Primary</e-button>
      </div>

      <h2>Width</h2>

      <h3>full</h3>

      <div :class="b('example')">
        <e-button width="full" @click="onClick">Full width</e-button>
      </div>

      <h3>auto</h3>

      <div :class="b('example')">
        <e-button width="auto" @click="onClick">Auto width</e-button>
      </div>

      <h2>~~Negative~~</h2>

      Not defined yet.

      <div :class="b('example')">
        <e-button negative @click="onClick">Negative</e-button>
      </div>

      <h2>Spacing</h2>

      <h3>default</h3>

      <div :class="b('example')">
        <e-button width="auto" @click="onClick">Spacing (default)</e-button>
      </div>

      <h3>0</h3>

      <div :class="b('example')">
        <e-button spacing="0" width="auto" @click="onClick">Spacing 0</e-button>
      </div>

      <h2>Progress</h2>

      <h3>Default</h3>

      <div :class="b('example')">
        <e-button progress @click="onClick">Progress</e-button>
      </div>

      <h3>Primary</h3>

      <div :class="b('example')">
        <e-button progress primary @click="onClick">Progress</e-button>
      </div>

      <h2>Native states</h2>

      <h3>:hover</h3>
      <div :class="b('example')">
        <e-button hover @click="onClick">:hover</e-button>
      </div>

      <h3>:active</h3>
      <div :class="b('example')">
        <e-button active @click="onClick">:active</e-button>
      </div>

      <h3>:focus</h3>
      <div :class="b('example')">
        <e-button focus @click="onClick">:focus</e-button>
      </div>

      <h3>\[disabled\]</h3>
      <div :class="b('example')">
        <e-button disabled @click="onClick">[disabled]</e-button>
      </div>

      <h3>primary:hover</h3>
      <div :class="b('example')">
        <e-button hover primary @click="onClick">:hover</e-button>
      </div>

      <h3>primary:active</h3>
      <div :class="b('example')">
        <e-button active primary @click="onClick">:active</e-button>
      </div>

      <h3>primary:focus</h3>
      <div :class="b('example')">
        <e-button focus primary @click="onClick">:focus</e-button>
      </div>

      <h3>primary\[disabled\]</h3>
      <div :class="b('example')">
        <e-button disabled primary @click="onClick">[disabled]</e-button>
      </div>

      <h2>Link</h2>

      Creates a button like link.

      <h3>Default</h3>

      <div :class="b('example')">
        <e-button href="https://www.google.com" target="_blank">Link</e-button>
      </div>

      <h3>Primary</h3>

      <div :class="b('example')">
        <e-button primary href="https://www.google.com" target="_blank">Link</e-button>
      </div>

      <h3>Width</h3>

      <div :class="b('example')">
        <e-button width="full" href="https://www.google.com" target="_blank">Link</e-button>
      </div>

      <h2>Cases</h2>

      <h3>Multiline</h3>

      <div :class="b('example')">
        <e-button @click="onClick">A button<br>with wrapping<br>text</e-button>
      </div>

    </l-default>
  </div>
</template>

<script>
  import LDefault from '@/components/l-default';

  export default {
    name: 'buttons',
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

    methods: {
      onClick() {
        // eslint-disable-next-line no-console
        console.info('click');
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .buttons {
    &__example {
      margin-bottom: $spacing--30;
    }
  }
</style>
