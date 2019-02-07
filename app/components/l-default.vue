<template>
  <div v-bem data-app>
    <div ref="content" v-bem:content>
      <div ref="inner"
           v-bem:inner>
        <c-notification-container />
        <slot></slot>
      </div>
    </div>
    <portal-target name="modal-container" multiple />
  </div>
</template>

<script>
  import cNotificationContainer from '@/components/c-notification-container';

  export default {
    name: 'l-default',
    // status: 1,

    components: {
      cNotificationContainer,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.getNotificationsFromStorage();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {

      /**
       * Gets localStorage messages and pushes them in the notification store to display.
       */
      getNotificationsFromStorage() {
        const messages = window.localStorage.getItem('notifications');
        const messagesParsed = messages && JSON.parse(messages) ? JSON.parse(messages) : [];

        if (messages && Array.isArray(messagesParsed)) {
          messagesParsed.forEach((message) => {
            this.pushNotification({ message });
          });

          // Clears the localStorage notifications.
          window.localStorage.removeItem('notifications');
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .l-default {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &__content {
      background: $color-grayscale--600;
      flex: 1 0 auto;
      min-height: 1px; // Fixes a content shifting issue with IE11 if a child element has hover
    }

    &__inner {
      position: relative;
      background: $color-grayscale--1000;
      box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);
      max-width: #{map-get($breakpoints, xl) - 20px};
    }
  }

  .s-layout {
    max-width: initial;
    margin: initial;
  }
</style>
