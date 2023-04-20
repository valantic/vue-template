<template>
  <div :class="b({ responsive: hasFixedSize() })">
    <iframe
      :class="b('iframe', { responsive: hasFixedSize() })"
      :src="mapSrc"
      :allowfullscreen="allowfullscreen"
      :frameborder="frameborder"
      :width="width"
      :height="height"
    ></iframe>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';

  enum VideoSource {
    youtube = 'youtube',
    vimeo = 'vimeo'
  }

  /**
   * Specifies the allowed video base url.
   */
  enum VideoUrlSource {
    youtube = 'https://www.youtube.com',
    vimeo = 'https://vimeo.com/'
  }

  /**
   * Specifies the embedded video player base url.
   */
  enum PlayerUrlSource {
    youtube = 'https://www.youtube.com/embed/',
    vimeo = 'https://player.vimeo.com/video/'
  }

  /**
   * Renders a video element as iframe for a given youtube or vimeo video url or id.
   */
  export default defineComponent({
    name: 'e-video',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},

    props: {
      /**
       * Specifies the source of the video.
       *
       * We can decide between youtube and vimeo.
       */
      source: {
        type: String as PropType<keyof typeof VideoSource>,
        required: true,
        validator(value: string) {
          return Object.values(VideoSource).includes(value as VideoSource);
        },
      },

      /**
       * Allows the user to watch the video in fullscreen.
       */
      allowfullscreen: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to add/remove the border around the player.
       *
       * When set to 0 the border is completely removed.
       *
       * Default from iframe is 2.
       */
      frameborder: {
        type: String,
        default: '2',
      },

      /**
       * Accepts a valid url from a youtube or vimeo video.
       */
      videoUrl: {
        type: String,
        default: null,
      },

      /**
       * Accepts an ID from a youtube or vimeo video.
       */
      videoId: {
        type: String,
        default: null,
      },

      /**
       * Allows to set the video player width.
       * width can either be responsive or hard coded.
       * youtube standard -> width="560".
       */
      width: {
        type: String,
        default: null,
      },

      /**
       * Allows to set the video player height.
       * height can either be responsive or hard coded.
       * youtube standard -> height="315".
       */
      height: {
        type: String,
        default: null,
      },
    },

    // emits: {},
    // setup(): Setup {},

    computed: {
      mapSrc(): string | undefined {
        const playerBaseUrl = PlayerUrlSource[this.source];

        if (!this.videoId && !this.videoUrl) {
          // eslint-disable-next-line no-console
          console.error("Neither 'videoId' or 'videoUrl' were defined", this.$el);

          return undefined;
        }

        if (this.videoUrl && !this.videoId) {
          if (!this.validateUrl()) {
            return undefined;
          }

          if (this.source === 'youtube') {
            /**
             * Extract id from youtube video url.
             */
            console.log('map url', this.videoUrl);
            const id = this.videoUrl.substring(
              this.videoUrl.indexOf('v=') + 2,
              this.videoUrl.indexOf('&')
            );

            return `${playerBaseUrl}${id}`;
          }

          /**
           * Extract id from vimeo video url.
           */
          const id = this.videoUrl.substring(
            this.videoUrl.indexOf(VideoUrlSource[this.source])
              + VideoUrlSource[this.source].length,
            this.videoUrl.length
          );

          return `${playerBaseUrl}${id}`;
        }

        if (this.videoId.includes(VideoUrlSource[this.source])) {
          // eslint-disable-next-line no-console
          console.error('video-id can not be part of a URL');

          return undefined;
        }

        return `${playerBaseUrl}${this.videoId}`;
      },
    },

    // computed: {},
    watch: {
      /**
       * This should check whether responsive or height + width are specified.
       */
      $props: {
        immediate: true,
        handler() {
          if (this.width || this.height) {
            if (!this.height && !this.width) {
              console.error('Both, width and height need to be specified');
            }
          }
        },
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
      /**
       * This is a helper function to validate the videoUrl property.
       */
      validateUrl(): boolean {
        if (
          this.videoUrl
          && !this.videoUrl.startsWith(VideoUrlSource[this.source])
        ) {
          console.error('Invalid video url');

          return false;
        }

        return true;
      },
      hasFixedSize(): boolean {
        return !this.width && !this.height;
      },
    },
  // render() {},
  });
</script>

<style lang="scss">
@use '../setup/scss/variables';

.e-video {
  &--responsive {
    aspect-ratio: 16/9;
  }

  &__iframe {
    &--responsive {
      aspect-ratio: 16/9;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
