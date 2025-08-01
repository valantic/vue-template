<template>
  <l-vas-layout>
    <div
      v-for="styleVariant in styleVariants"
      :key="styleVariant"
      :class="b('section')"
    >
      <h3>Variant: {{ styleVariant }}</h3>
      <div :class="b('type-section')">
        <e-button
          v-for="(type, index) in width"
          :key="index"
          :width="type"
          :variant="styleVariant"
        >
          Button width: {{ type }}
        </e-button>
      </div>

      <div :class="b('type-section')">
        <e-button
          v-for="variant in getButtonVariants"
          :key="variant.label"
          :progress="variant.progress"
          :hover="variant.hover"
          :focus="variant.focus"
          :active="variant.active"
          :disabled="variant.disabled"
          :variant="styleVariant"
        >
          {{ variant.label }}
        </e-button>
      </div>

      <h6>Variant: {{ styleVariant }} - inverted</h6>
      <div :class="b('type-section', { inverted: true })">
        <e-button
          v-for="variant in getButtonVariants"
          :key="variant.label"
          :progress="variant.progress"
          :hover="variant.hover"
          :focus="variant.focus"
          :active="variant.active"
          :disabled="variant.disabled"
          :variant="styleVariant"
          inverted
        >
          {{ variant.label }}
        </e-button>
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';
  import eButton, { BUTTON_STYLE_VARIANTS, BUTTON_WIDTH_VARIANTS } from '@/elements/e-button.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-buttons',
    components: {
      eButton,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data() {
      return {
        styleVariants: BUTTON_STYLE_VARIANTS,
        width: BUTTON_WIDTH_VARIANTS,
        buttonStates: ['progress', 'hover', 'focus', 'active', 'disabled'],
        buttonDefault: {
          label: 'Button',
          progress: false,
          hover: false,
          focus: false,
          active: false,
          disabled: false,
        },
      };
    },

    computed: {
      getButtonVariants() {
        const variants = this.buttonStates.map((state: string) => ({
          ...this.buttonDefault,
          label: state,
          [state]: true,
        }));

        return [
          {
            ...this.buttonDefault,
            label: 'Button',
          },
          ...variants,
        ];
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .r-buttons {
    &__section {
      margin-bottom: 8rem;
    }

    &__type-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;

      &--inverted {
        padding: 3rem 0;
        background-color: var(--theme-color-grayscale--0);
      }
    }
  }
</style>
