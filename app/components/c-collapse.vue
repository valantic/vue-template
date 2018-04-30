<template>

  <v-collapse-wrapper :active="active" :class="b({expanded: isExpanded})">

    <div v-collapse-toggle :class="b('toggle')" @click="setState">
      {{ title }}
    </div>

    <div v-collapse-content :class="b('content')">
      <div :class="b('inner')">
        <slot></slot>
      </div>
    </div>

  </v-collapse-wrapper>

</template>

<script>
  export default {
    name: 'c-collapse',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Sets item to active
       */
      active: {
        type: Boolean,
        required: false,
        default: false,
      },

      /**
       * Title of the toggle
       */
      title: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        isExpanded: false
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    beforeMount() {
      if (this.$props.active) this.isExpanded = true;
    },
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Sets and emits the current state
       */
      setState() {
        this.isExpanded = !this.isExpanded; // toggle state
        this.$emit('toggle-state', this.isExpanded); // listens to @toggle-state
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-collapse {
    border-top: 1px solid $color-grayscale--600;
    font-family: $font-family--primary;

    &:last-child {
      border-bottom: 1px solid $color-grayscale--600;
    }

    &__toggle {
      color: $color-grayscale--400;
      cursor: pointer;
      font-size: $font-size--16;
      height: 40px;
      line-height: 40px;
      padding: 0 $spacing--20;
      position: relative;

      &::before {
        content: "+";
        color: $color-grayscale--400;
        font-size: $font-size--18;
        left: 0;
        position: absolute;
        transition: transform 0.15s ease-in-out;

        .c-collapse--expanded & {
          transform: rotate(45deg);
        }
      }

      &::after {
        border-bottom: 1px solid $color-primary--1;
        bottom: 0;
        left: 0;
        content: "";
        position: absolute;
        transition: width 0.3s ease;
        width: 0;
      }

      .c-collapse--expanded & {
        color: $color-secondary--1;
        transition: color 0.3s;

        &::after {
          width: 100%;
        }
      }
    }

    &__content {
      color: $color-grayscale--200;
      font-size: $font-size--14;
      line-height: $font-size--14 + 4;
    }

    &__inner {
      padding: $spacing--10 $spacing--20;
    }
  }
</style>
