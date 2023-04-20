<template>
  <div :class="b()">
    <!-- youtube example with url -->
    <e-video
      source="youtube"
      video-url="https://www.youtube.com/watch?v=WYs_Y4D3NUs&ab_channel=valantic"
    />
    <!-- youtube example with id -->
    <e-video source="youtube"
             video-id="WYs_Y4D3NUs"
             width="560"
             height="315"
    />

    <!-- vimeo example with url -->
    <e-video source="vimeo" video-url="https://vimeo.com/264037633" />

    <!-- vimeo example with id -->
    <e-video source="vimeo" video-id="264037633" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import eVideo from '@/elements/e-video.vue';

  /**
   * A component that integrates the e-picture for testing its functionality and passing properties.
   */
  export default defineComponent({
    name: 'r-videos',

    components: {
      eVideo,
    },

  // props: {}, // emits: {},

  // setup(): Setup {},

  // computed: {},
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
@use '../../setup/scss/variables';

.r-video {
  &__form {
    display: flex;
  }
}
</style>
