<template>
  <div :class="b()">
    <div :class="responsive ? b('responsive') : null">
      <iframe
        :class="responsive ? b('iframe', { responsive }) : b('iframe')"
        :src="mapSrc"
        :allowfullscreen="allowfullscreen"
        :frameborder="frameborder.toString()"
        :width="width.toString()"
        :height="height.toString()"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">

/**
 * CONFIG
 *  baseUrl:
 *    - vimeo: "https://player.vimeo.com/video/
 *    - youtube: "https://www.youtube.com/embed/"
 *  controls:
 *    - youtube disables in src with ?controls=0
 *    - vimeo not able to disable controls
 *  size:
 *    - width & height can either be responsive or hard coded
 *    - youtube standard -> width="560", height="315"
 */
  import { PropType, defineComponent } from 'vue';

  const videoUrlSources = {
    youtube: 'https://www.youtube.com',
    vimeo: 'https://vimeo.com/',
  };

  const playerUrlSources = {
    youtube: 'https://www.youtube.com/embed/',
    vimeo: 'https://player.vimeo.com/video/',
  };

  export default defineComponent({
    name: 'e-video',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},

    props: {
      /**
       * Allows the user to watch the video in fullscreen
       */
      allowfullscreen: {
        type: Boolean,
        default: false,
      },

      /**
       * Specifies the source of the video
       *
       * We can decide between youtube and vimeo
       */
      source: {
        type: String as PropType<'youtube' | 'vimeo'>,
        required: true,
        validator(value: string) {
          return Object.keys(playerUrlSources).includes(value);
        },
      },

      /**
       * Allows to add/remoe the border around the player
       *
       * When set to 0 the border is completely removed
       *
       * Default from iframe is 2
       */
      frameborder: {
        type: [String, Number],
        default: 2,
      },

      /**
       * Accepts a valid url from a youtube or vimeo video
       */
      videoUrl: {
        type: String,
        default: null,
      },

      /**
       * Accepts an ID from a youtube or vimeo video
       */
      videoId: {
        type: String,
        default: null,
      },

      /**
       * Allows to set the video player width.
       */
      width: {
        type: [String, Number],
        default: 560,
      },

      /**
       * Allows to set the video player height.
       */
      height: {
        type: [String, Number],
        default: 315,
      },

      /**
       * Defines the players size to be responsive 100% width to the parent container
       */
      responsive: {
        type: Boolean,
        default: false,
      },
    },

    // emits: {},
    // setup(): Setup {},

    computed: {
      mapSrc(): string | undefined {
        const playerBaseUrl = playerUrlSources[this.source];

        if (!(this.videoId || this.videoUrl)) {
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
             * Extract id from video url
             */
            const id = this.videoUrl.substring(
              this.videoUrl.indexOf('v=') + 2,
              this.videoUrl.indexOf('&')
            );

            return `${playerBaseUrl}${id}`;
          }

          const id = this.videoUrl.substring(
            this.videoUrl.indexOf(videoUrlSources[this.source])
              + videoUrlSources[this.source].length,
            this.videoUrl.length
          );

          return `${playerBaseUrl}${id}`;
        }

        if (this.videoId.includes(videoUrlSources[this.source])) {
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
       * This should check whether responsive or height + width are specified
       */
      $props: {
        immediate: true,
        handler() {
          if (this.responsive && (this.width || this.height)) {
            console.error('Either use responsive or height and width');
          } else if (
            (this.width && !this.height)
            || (!this.width && this.height)
          ) {
            console.error('width and height both need to be specified');
          }
        },
      },
      videoUrl: {
        immediate: true,
        handler() {
          this.validateUrl();
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
       * This is a helper function to validate the videoUrl property
       */
      validateUrl(): boolean {
        if (
          this.videoUrl
          && !this.videoUrl.includes(videoUrlSources[this.source])
        ) {
          console.error('Invalid video url');

          return false;
        }

        return true;
      },
    },
  // render() {},
  });
</script>

<style lang="scss">
@use '../setup/scss/variables';

.e-video {
  &__responsive {
    position: relative;
    padding: 56.25% 0 0;
  }

  &__iframe {
    display: flex;
    margin: variables.$spacing--20 auto;

    &--responsive {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
