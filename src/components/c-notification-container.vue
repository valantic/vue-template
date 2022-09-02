<template>
  <div :class="b()">
    <transition-group name="list" tag="div">
      <c-notification v-for="notification in filteredNotifications"
                      :key="notification.id"
                      :notification="notification"
      />
    </transition-group>
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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-notification-container {
    /* VUE Animation styles */
    .list-enter-active,
    .list-leave-active {
      transition: all variables.$transition-duration--300;
    }

    .list-leave-active {
      position: absolute;
    }

    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }

    .list-leave-to {
      transform: translateY(-30px);
    }

    .list-move {
      transition: transform 1s;
    }
  }
</style>
