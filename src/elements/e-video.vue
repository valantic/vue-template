<template>
  <div :class="b({ responsive: hasFixedSize })">
    <iframe
      :class="b('iframe', { responsive: hasFixedSize })"
      :src="mapSrc"
      :allowfullscreen="allowFullscreen"
      :width="width"
      :height="height"
    ></iframe>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';

  export enum VideoSource {
    Vimeo = 'vimeo',
    Youtube = 'youtube'
  }

  /**
   * Specifies the allowed video base url.
   */
  const VideoUrlSource: { [key: string]: string | string[] } = {
    [VideoSource.Youtube]: ['https://www.youtube.com', 'https://youtu.be'],
    [VideoSource.Vimeo]: 'https://vimeo.com/',
  };

  /**
   * Specifies the embedded video player base url.
   */
  const PlayerUrlSource = {
    [VideoSource.Vimeo]: 'https://player.vimeo.com/video/{videoId}',
    [VideoSource.Youtube]: 'https://www.youtube.com/embed/{videoId}',
  };

  /**
   * Renders a video element as iframe for a given youtube or vimeo video url or id.
   * Size of the video player can be managed by an outer container.
   * It works just fine when the outer container has a fixed width.
   * However it does not when the outer container has only a fixed height.
   */
  export default defineComponent({
    name: 'e-video',

    // components: {},

    props: {
      /**
       * Specifies the source of the video.
       *
       * We can decide between youtube and vimeo.
       */
      source: {
        type: String as PropType<VideoSource>,
        required: true,
        validator(value: string) {
          return Object.values(VideoSource).includes(value as VideoSource);
        },
      },

      /**
       * Allows the user to watch the video in fullscreen.
       */
      allowFullscreen: {
        type: Boolean,
        default: false,
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
      /**
       * Returns a validity check for the video url.
       */
      validateUrl(): boolean {
        if (this.videoUrl) {
          /**
           * This is for sources with multiple allowed urls.
           * e.g. youtube (standard, short)
           */
          if (Array.isArray(VideoUrlSource[this.source])) {
            const videoSources = VideoUrlSource[this.source] as string[];

            return this.arrayHasString(videoSources, this.videoUrl);
          }

          if (!this.videoUrl.startsWith(VideoUrlSource[this.source] as string)) {
            // eslint-disable-next-line no-console
            console.error('Invalid video url', this.$el);

            return false;
          }

          return true;
        }

        return true;
      },

      /**
       * Returns the validated and adapted video source.
       */
      mapSrc(): string | undefined {
        const playerBaseUrl = PlayerUrlSource[this.source];

        if (!this.videoId && !this.videoUrl) {
          // eslint-disable-next-line no-console
          console.error("Neither 'videoId' or 'videoUrl' were defined", this.$el);

          return undefined;
        }

        if (this.videoUrl && !this.videoId) {
          if (!this.validateUrl) {
            return undefined;
          }

          let id: string | null;

          switch (this.source) {
            case VideoSource.Youtube:
              id = new URLSearchParams(new URL(this.videoUrl).search).get('v');

              return this.replaceIdInUrl(playerBaseUrl, id);

            case VideoSource.Vimeo:
              id = new URL(this.videoUrl).pathname.slice(1);

              return this.replaceIdInUrl(playerBaseUrl, id);

            default:
              return undefined;
          }
        }

        /**
         * The videoId can consist of lowercase/uppercase letters, numbers, dashes and underscores.
         */
        if ((/[a-zA-Z0-9-_]/).test(this.videoId) === false) {
          // eslint-disable-next-line no-console
          console.error('video-id can not be part of a URL');

          return undefined;
        }

        return this.replaceIdInUrl(playerBaseUrl, this.videoId);
      },

      /**
       * Returns
       */
      hasFixedSize(): boolean {
        return !this.width && !this.height;
      },
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    created() {
      if (this.width || this.height) {
        if (!this.height && !this.width) {
          // eslint-disable-next-line no-console
          console.error('Both, width and height need to be specified');
        }
      }
    },
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
       * This is a helper for replacing part of a string.
       * @param original string
       * @param replace string | null
       */
      replaceIdInUrl(
        original: string,
        replace: string | null
      ): string | undefined {
        if (!replace) {
          return undefined;
        }

        return original.replace('{videoId}', replace);
      },

      /**
       * Helper to check wether a string matches with entries in an array.
       * @param arr string[]
       * @param searchString string
       */
      arrayHasString(arr: string[], searchString: string): boolean {
        return arr.some((videoSource) => {
          if (!searchString.startsWith(videoSource)) {
            // eslint-disable-next-line no-console
            console.error('Invalid video url', this.$el);

            return false;
          }

          return true;
        });
      },
    },
  // render() {},
  });
</script>

<style lang="scss">
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
