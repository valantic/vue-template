<template>
  <div>
    <div v-for="item in dataSet"
         :key="name + '-' + item.id"
         :class="b('container', containerModifiers)"
    >
      <e-radio :id="name + '-' + item.id"
               v-model="internalValue"
               :name="name"
               :value="item.value"
               :display-name="item.displayName"
               @change="onChange"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-radio',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Provides an array with all the radio elements which should be rendered.
       */
      dataSet: {
        required: true,
        type: Array,
      },

      /**
       * Name of the radio element group.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * Value attribute.
       */
      value: {
        required: true,
        type: String,
      },

      /**
       * Defines if the elements should be aligned vertical.
       */
      vertical: {
        default: false,
        type: Boolean,
      }
    },
    // data() {},

    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(value) {
          /**
           * Fired on change of selected radio button.
           *
           * @event change
           * @type {String}
           */
          this.$emit('change', value);
        }
      },
      containerModifiers() {
        return {
          vertical: this.vertical,
        };
      },
    },
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
      onChange(value) {
        this.$emit('input', value);
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-radio {
    &__container--vertical {
      display: inline-block;
      padding-right: $spacing--40;
    }

    &__container--vertical:last-child {
      padding-right: $spacing--0;
    }
  }
</style>
