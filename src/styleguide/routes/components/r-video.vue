<template>
  <div :class="b()">
    <!-- youtube example with url -->
    <e-video
      :source="VideoSource.Youtube"
      video-url="https://www.youtube.com/watch?v=WYs_Y4D3NUs&ab_channel=valantic"
      allow-fullscreen
    />
    <!-- youtube example with id -->
    <e-video
      :source="VideoSource.Youtube"
      video-id="WYs_Y4D3NUs"
    />

    <!-- vimeo example with url -->
    <e-video
      :source="VideoSource.Vimeo"
      video-url="https://vimeo.com/264037633"
    />

    <!-- vimeo example with id -->
    <e-video
      :source="VideoSource.Vimeo"
      video-id="264037633"
      allow-fullscreen
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVideo, { VideoSource } from '@/elements/e-video.vue';

  type Setup = {
    VideoSource: typeof VideoSource;
  };

  /**
   * A component that integrates the e-picture for testing its functionality and passing properties.
   */
  export default defineComponent({
    name: 'r-videos',

    components: {
      eVideo,
    },

    // props: {}, // emits: {},

    setup(): Setup {
      return {
        VideoSource,
      };
    },

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
  @use '../../../setup/scss/variables';

  .r-video {
    &__form {
      display: flex;
    }
  }
</style>
