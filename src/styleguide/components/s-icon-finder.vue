<template>
  <div :class="b()" :style="{ '--s-icon-finder--color': color }">
    <div :class="b('filter')">
      <label :class="b('label')">
        Search:
        <input v-model="filter"
               :class="b('filter-input')"
               placeholder="Search …"
        >
      </label>
      <label :class="b('label')">
        Color:
        <input v-model="color"
               :class="b('filter-input')"
               type="color"
        >
      </label>
      <label :class="b('label', { variant: true })">
        Variant:
        <select v-model="variant"
                :class="b('filter-input')"
        >
          <option value="inline">
            inline (colorable)
          </option>
          <option value="image">
            image
          </option>
          <option value="css">
            css
          </option>
          <option value="mask">
            css mask (colorable)
          </option>
        </select>
      </label>
    </div>
    <div :class="b('grid')">
      <div v-for="(icon, index) in filteredIcons"
           :key="index"
           :class="b('grid-item', { negative: icon.negative })"
           role="button"
           @click="copyToClipboard(icon)"
      >
        <div :class="b('icon-wrapper')">
          <div v-if="['mask', 'css'].includes(variant)"
               :class="b('icon', { variant })"
               :style="{ [variant === 'css' ? 'backgroundImage' : 'maskImage']: `url(${spritePath}#${icon.name})` }"
          ></div>
          <e-icon v-else
                  :key="icon.name"
                  :icon="icon.name"
                  :inline="variant === 'inline'"
                  size="80"
          />
        </div>
        <div :class="b('icon-label')">
          {{ icon.name }}
        </div>
      </div>
    </div>
    <div v-if="notification" :class="b('notification')">
      {{ notification }}
    </div>
    <input ref="input" :class="b('clipboard')" type="text">
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref } from 'vue';
  import spritePath from '@/assets/icons.svg';
  import eIcon from '@/elements/e-icon.vue';

  interface ISetup {
    input: Ref<HTMLInputElement | null>;
  }

  interface IFilteredIcon {
    name: string;
    negative: boolean;
  }

  interface IData {

    /**
     * An array of available icons.
     */
    icons: string[];

    /**
     * The currently applied query filter.
     */
    filter: string;

    /**
     * Clipboard notification.
     */
    notification: string;

    /**
     * The currently selected color.
     */
    color: string;

    /**
     * The currently selected variant.
     */
    variant: 'inline' | 'image' | 'css' | 'mask';

    /**
     * The sprite path to use.
     */
    spritePath: string;
  }

  interface IIcon {
    name: string;
  }

  const icons = import.meta.glob('@/assets/icons/*.svg');

  export default defineComponent({
    name: 's-icon-finder',

    components: {
      eIcon,
    },
    // props: {}, 

    setup(): ISetup {
      const input = ref();

      return {
        input,
      };
    },

    data(): IData {
      return {
        icons: Object.keys(icons)
          .map(path => path
            .split('/')
            .pop()
            ?.replace('.svg', '') || '')
          .filter(Boolean),
        filter: '',
        notification: '',
        color: '#000000',
        variant: 'inline',
        spritePath,
      };
    },

    // components: {},
    computed: {
      /**
       * Returns an array of query filtered icons.
       */
      filteredIcons(): IFilteredIcon[] {
        const list = this.icons.filter((icon: string) => icon.indexOf(this.filter) > -1);

        return list.map((icon: string) => { // eslint-disable-line arrow-body-style
          return {
            name: icon,
            negative: Boolean(icon.match(/negative/)),
          };
        });
      },
    },
    methods: {
      /**
       * Event handler for copy to clipboard button.
       */
      copyToClipboard(icon: IIcon) {
        const hiddenInput = this.input as HTMLInputElement;
        let template;

        switch (this.variant) {
          case 'mask':
            template = `@include mixins.icon(${icon.name});`;
            break;

          case 'css':
            template = `background-image: url('@/assets/icons.svg#${icon.name}');`;
            break;

          case 'image':
            template = `<e-icon icon="${icon.name}" :inline="false" />`;
            break;

          default:
            template = `<e-icon icon="${icon.name}"/>`;
        }

        hiddenInput.value = template;
        hiddenInput.select();

        document.execCommand('Copy');

        this.setNotification(`copied! - ${template}`);

        setTimeout(() => {
          this.setNotification('');
        }, 2000);
      },

      /**
       * Shows the given notification.
       */
      setNotification(message: string) {
        this.notification = message;
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
  });
</script>

<style lang="scss">
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .s-icon-finder {
    font-family: variables.$font-family--primary;

    &__filter {
      display: flex;
      margin-bottom: variables.$spacing--35;
    }

    &__label {
      display: flex;
      align-items: center;
      margin: 0 variables.$spacing--10 variables.$spacing--10 0;

      &--variant {
        margin: 0 0 0 auto;
      }
    }

    &__filter-input {
      display: block;
      margin-left: variables.$spacing--5;
    }

    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
    }

    &__grid-item {
      flex: 0 1 10%;
      min-width: 100px;
      margin: 5px;
      overflow: hidden;
      border: 1px solid #000000;
      cursor: pointer;

      &::before {
        display: block;
        content: '';
        float: left;
        width: 0;
        padding-top: 100%;
      }
    }

    &__grid-item--negative {
      background-color: variables.$color-grayscale--500;
    }

    &__icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      height: 80%;
      color: var(--s-icon-finder--color);
    }

    div#{&}__icon {
      width: 80px;
      height: 80px;
      background: no-repeat center center;

      &--variant-mask {
        background: currentColor;
        mask: no-repeat center center / 80px 80px;
      }
    }

    &__icon-label {
      @include mixins.font(10);

      text-align: center;
    }

    &__clipboard {
      position: absolute;
      left: -99999px;
    }

    &__notification {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      padding: variables.$spacing--10;
      background-color: variables.$color-status--success;
      text-align: center;
    }

    &__grid-item:hover &__icon-wrapper {
      color: variables.$color-primary--1;
    }
  }
</style>
