<template>
  <div :class="b()">
    <div :class="b('content')">
      <div :class="b('inner')">
        <c-notification-container />
        <slot></slot>
      </div>
    </div>
    <portal-target name="modal-container" multiple />
  </div>
</template>

<script>
  import cNotificationContainer from '@/components/c-notification-container.vue';

  export default {
    name: 'l-default',
    status: 0, // TODO: remove when component was prepared for current project.

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
        try {
          const messages = window.localStorage.getItem('notifications');
          const messagesParsed = messages ? JSON.parse(messages) : null;

          if (Array.isArray(messagesParsed) && messagesParsed.length) {
            messagesParsed.forEach((message) => {
              this.pushNotification({ message });
            });

            // Clears the localStorage notifications.
            window.localStorage.removeItem('notifications');
          }
        } catch (error) {
          throw new Error('An error occurred why retrieving messages from the localStorage.');
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .l-default {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &__content {
      background: variables.$color-grayscale--600;
      flex: 1 0 auto;
      min-height: 1px; // Fixes a content shifting issue with IE11 if a child element has hover
    }

    &__inner {
      position: relative;
      background: variables.$color-grayscale--1000;
      box-shadow: 0 4px 10px 1px rgba(variables.$color-grayscale--400, 0.3);
      max-width: #{map-get(variables.$breakpoints, xl) - 20px};
      margin: 0 auto;
    }

    .c-notification-container {
      @include mixins.z-index(globalNotification);

      position: absolute;
    }
  }
</style>
