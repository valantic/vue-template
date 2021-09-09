<template>
  <div :class="b()">
    <c-notification v-for="notification in filteredNotifications"
                    :key="notification.id"
                    :notification="notification"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import cNotification from '@/components/c-notification';

  /**
   * Container for rendering notifications. See /styleguide/notifications for demo.
   */
  export default {
    name: 'c-notification-container',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cNotification,
    },
    // mixins: [],

    props: {
      /**
       * Defines which notifications should get displayed in the container.
       */
      selector: {
        type: String,
        default: 'default',
        validator(value) {
          return [
            'default',
            'footer',
          ].includes(value);
        }
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('notification', [
        'getNotifications',
      ]),

      /**
       * Gets the filtered notifications depending on the selector.
       *
       * @returns {Array.<Object>}
       */
      filteredNotifications() {
        if (this.selector !== 'default') {
          return this.getNotifications.filter(notification => notification.selector === this.selector);
        }

        return this.getNotifications.filter(notification => !notification.selector);
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .c-notification-container {
    // Add custom styling.
  }
</style>
