<template>
  <div :class="b()">
    <div :class="b('filter')">
      <input v-model="filter"
             :class="b('filter-input')"
             placeholder="Search …"
      >
    </div>
    <div :class="b('grid')">
      <div v-for="(icon, index) in filteredIcons"
           :key="index"
           :class="b('grid-item', { negative: icon.negative })"
           role="button"
           @click="copyToClipboard(icon)"
      >
        <div :class="b('icon-wrapper')">
          <e-icon :key="icon.name" :icon="icon.name" width="50" />
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

  interface ISetup {
    input: Ref<HTMLInputElement | null>;
  }

  interface IData {
    icons: string[];
    filter: string;
    notification: string;
  }

  interface IIcon {
    name: string;
  }

  export default defineComponent({
    name: 's-icon-finder',

    // props: {},

    setup(): ISetup {
      const input = ref();

      return {
        input,
      };
    },

    data(): IData {
      const icons = require.context('../../assets/icons/', false, /\.svg/).keys();

      return {
        // @ts-ignore
        icons: icons.map(icon => icon.match(/\.\/(.*?)\.svg$/)[1]),
        filter: '',
        notification: ''
      };
    },

    // components: {},
    computed: {
      /**
       * Returns an array of query filtered icons.
       */
      filteredIcons(): object[] {
        const list = this.icons.filter((icon: string) => icon.indexOf(this.filter) > -1);

        return list.map((icon: string) => { // eslint-disable-line arrow-body-style
          return {
            name: icon,
            negative: Boolean(icon.match(/negative/))
          };
        });
      },
    },
    methods: {
      /**
       * Event handler for copy to clipboard button.
       */
      copyToClipboard(icon: IIcon) {
        const value = `<e-icon icon="${icon.name}"/>`;
        const hiddenInput = this.input as HTMLInputElement;

        hiddenInput.value = value;
        hiddenInput.select();
        document.execCommand('Copy');
        this.setNotification(`copied! - ${value}`);
        setTimeout(() => { this.setNotification(''); }, 2000);
      },

      /**
       * Shows the given notification.
       */
      setNotification(message: string) {
        this.notification = message;
      }
    }
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
  .s-icon-finder {
    font-family: $font-family--primary;

    &__filter-input {
      display: block;
    }

    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
    }

    &__grid-item {
      overflow: hidden;
      border: 1px solid #000000;
      margin: 5px;
      flex: 0 1 10%;
      cursor: pointer;
      min-width: 100px;

      &::before {
        display: block;
        content: "";
        float: left;
        width: 0;
        padding-top: 100%;
      }

      .s-icon {
        display: block;
        width: 50%;
        height: 50%;
        margin: auto;
      }

      .s-icon__icon {
        width: 100%;
        height: 100%;
      }
    }

    &__grid-item--negative {
      background-color: $color-grayscale--500;
    }

    &__icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      height: 80%;
    }

    &__icon-label {
      @include font(10);

      text-align: center;
    }

    &__clipboard {
      position: absolute;
      left: -99999px;
    }

    &__notification {
      position: fixed;
      top: 0;
      left: 0;
      background-color: $color-status--success;
      width: 100%;
      text-align: center;
      z-index: 999;
      padding: $spacing--10;
    }
  }
</style>
