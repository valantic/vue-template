<template>
  <div :class="b()">
    <div :class="b('color-wrapper')">
      <div :class="b('color')" :style="'background: linear-gradient(to right, ' + color.value + ' , ' + (second_color ? second_color.value : color.value) + ');'"/>
    </div>
    <div :class="b('color-label')">{{ color.name }}
      <span v-if="this.second_color" :class="b('color-label')"><br/>{{ second_color.name }}</span>
    </div>
    <div :class="b('color-value')">{{ color.value }}
      <span v-if="this.second_color" :class="b('color-value')">- {{ second_color.value }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-color-list-item',
    props: {
      color: {
        type: Object,
        default: null
      },
      second_color: {
        type: Object,
        default: null
      }
    }
};
</script>

<style lang="scss">
  .s-color-list-item {
    display: inline-block;

    &__color-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
    }

    &__color {
      width: 200px;
      height: 160px;
    }

    &__color-label {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }

    &__color-value {
      text-align: center;
      font-size: 12px;
    }
  }
</style>
