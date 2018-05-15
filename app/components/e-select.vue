<template>
  <div :class="b()">
    <select :value="value" @input="onInput">
      <option disabled value="">{{ selectText }}</option>
      <option v-for="item in optionsList" :key="name + '-' + item.value" :value="item.value">{{ item.label }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'e-select',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Value for vue model binding.
       */
      value: {
        required: true,
        type: String,
      },

      /**
       * Name is used to generate a unique key in vue.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * OptionsList defines the options which are rendered in the select.
       *
       * e.g. `[{ value: <option-1>, label: <Option 1> },{ value: <option-2>, label: <Option 2>},...]`
       */
      optionsList: {
        required: true,
        type: Array,
      },

      /**
       * The text to display if no option is selected by default.
       */
      selectText: {
        default: 'Please choose...',
        type: String,
      }
    },
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
      onInput(event) {
        this.$emit('input', event.currentTarget.value);
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-select {
  }
</style>
