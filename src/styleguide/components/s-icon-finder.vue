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
                  size="80" />
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

<script>
  const spritePath = require.context('@/assets/', false, /icons\.svg/)('./icons.svg');
  const icons = require.context('@/assets/icons/', false, /\.svg/).keys();

  export default {
    name: 's-icon-finder',

    // props: {},

    data() {
      return {
        /**
         * @type {Array} An array of available icons.
         */
        icons: icons.map(icon => icon.match(/\.\/(.*?)\.svg$/)[1]),

        /**
         * @type {String} The currently applied query filter.
         */
        filter: '',

        /**
         * @type {String} Clipboard notification.
         */
        notification: '',

        /**
         * @type {String} The currently selected color.
         */
        color: '#000000',

        variant: 'inline',

        spritePath,
      };
    },

    // components: {},
    computed: {
      /**
       * Returns an array of query filtered icons.
       *
       * @returns {Array.<Object>}
       */
      filteredIcons() {
        const list = this.icons.filter(icon => icon.indexOf(this.filter) > -1);

        return list.map((icon) => { // eslint-disable-line arrow-body-style
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
       *
       * @param {Object} icon - The icon instance for which the example code should be copied.
       */
      copyToClipboard(icon) {
        const hiddenInput = this.$refs.input;
        let template;

        switch (this.variant) {
          case 'mask':
            template = `@include mixins.icon(${icon.name});`;
            break;

          case 'css':
            template = `background-image: url('../assets/icons.svg#${icon.name}');`;
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
       *
       * @param {String} message - The to be shown message.
       */
      setNotification(message) {
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
    // beforeDestroy() {},
    // destroyed() {},
  };
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
      overflow: hidden;
      border: 1px solid #000000;
      margin: 5px;
      cursor: pointer;
      min-width: 100px;

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
      background-color: variables.$color-status--success;
      width: 100%;
      text-align: center;
      z-index: 999;
      padding: variables.$spacing--10;
    }

    &__grid-item:hover &__icon-wrapper {
      color: variables.$color-primary--1;
    }
  }
</style>
