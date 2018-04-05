<template>
  <div :class="b()">
    <div v-for="palette in palettes" :key=palette>
      <h4 :class="b('palette-headline')">{{palette}} colors</h4>
      <div :class="b('grid')">
        <div v-if="palette !== 'gradient'" v-for="color in colors[palette]" :class="b('grid-item')" :key=color>
          <s-color-list-item :color="color"/>
        </div>
        <div v-if="palette === 'gradient' && (index % 2 === 0)" v-for="(color, index) in colors[palette]" :class="b('grid-item')" :key=color>
          <s-color-list-item :color="color" :second_color="colors[palette][index+1]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import sColorListItem from './s-color-list-item';

  export default {
    name: 's-color-list',
    components: {
      "s-color-list-item": sColorListItem
    },
    data() {
      const colors = require('../../setup/js/_color');

      return {
        palettes: ['primary', 'secondary', 'grayscale', 'status', 'gradient'],
        colors: colors
      };
    }
  };
</script>

<style lang="scss">
  .s-color-list {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    &__palette-headline {
      text-transform: capitalize;
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
      flex: 0 1 15%;

      &::before {
        display: block;
        content: "";
        float: left;
        width: 0;
        padding-top: 100%;
      }
    }
  }
</style>
