<template>
  <div :class="b('navigation-filter-wrapper')">
    <div
      v-show="internalValue"
      :class="b('navigation-filter-icon', { reset: !!internalValue })"
      @click.stop="onReset"
    >
      <e-icon
        icon="i-close"
        size="16"
      />
    </div>
    <div
      v-show="!internalValue"
      :class="b('navigation-filter-icon', { search: !!internalValue })"
    >
      <e-icon
        icon="i-search"
        size="16"
      />
    </div>
    <input
      v-model="internalValue"
      v-focus="isOpen && !!internalValue"
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
    directives: {
      /**
       * Focus the element on nextTick if binding evaluates to true.
       */
      focus: {
        updated(el, binding) {
          if (binding.value) {
            nextTick(() => {
              el.focus();
            });
          }
        },
      },
    },
    props: {
      /**
       * The searchTerm to filter the navigation for.
       */
      value: {
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
    data() {
      return {
        internalValue: this.value,
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal;
      },
      internalValue(newVal) {
        this.$emit('update:modelValue', newVal);
      },
    },
    methods: {
      onReset() {
        this.internalValue = '';
      },
    },
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
      width: 16px;
      height: 16px;

      &--reset {
        cursor: pointer;
        color: variables.$color-primary--1;
      }

      &--search {
        color: variables.$color-primary--2;
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
