<template>
  <div :class="b('navigation-filter-wrapper')">
    <button
      v-if="internalValue"
      :class="b('navigation-filter-icon', { reset: true })"
      type="button"
      @click.stop="onReset"
    >
      <e-icon
        icon="i-close"
        size="16"
      />
    </button>
    <div
      v-else
      :class="b('navigation-filter-icon')"
      type="button"
    >
      <e-icon
        icon="i-search"
        size="16"
      />
    </div>
    <input
      v-model.trim="internalValue"
      ref="searchInput"
      :class="b('navigation-filter-input')"
      type="search"
      placeholder="Search …"
      @click.stop
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick } from 'vue';
  import eIcon from '@/elements/e-icon.vue';

  export default defineComponent({
    name: 's-navigation-filter',
    components: {
      eIcon,
    },
    // directives: {},
    props: {
      /**
       * The searchTerm to filter the navigation for.
       * Comes in as 2-way binding (v-model) from the parent component.
       */
      modelValue: {
        type: String,
        default: '',
      },
      /**
       * Indicates if the navigation bar is open.
       */
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    emits: {
      'update:modelValue': (value: string) => typeof value === 'string',
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Getter / setter for the internal value.
       */
      internalValue: {
        get(): string {
          return this.modelValue;
        },
        set(newVal: string): void {
          this.$emit('update:modelValue', newVal);
        },
      },
    },
    watch: {
      isOpen(newVal) {
        if (newVal && this.internalValue) {
          nextTick(() => {
            (this.$refs.searchInput as HTMLInputElement)?.focus();
          });
        }
      },
    },

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

    methods: {
      onReset() {
        this.internalValue = '';
      },
    },

    // render() {},
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  .s-navigation-filter {
    &__navigation-filter-wrapper {
      position: relative;
    }

    &__navigation-filter-icon {
      position: absolute;
      top: 12px;
      right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: variables.$color-primary--2;

      &--reset {
        cursor: pointer;
        color: variables.$color-primary--1;
      }
    }

    &__navigation-filter-input {
      width: 100%;
      margin-top: variables.$spacing--10;
      padding: variables.$spacing--10;
      border: 1px solid transparent;

      &:focus {
        border-color: variables.$color-status--info;
      }
    }
  }
</style>
