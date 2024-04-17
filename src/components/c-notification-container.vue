<template>
  <div :class="b()">
    <transition-group
      name="list"
      tag="div"
    >
      <c-notification
        v-for="notification in filteredNotifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useNotificationStore, { MappedNotificationItem } from '@/stores/notification';
  import cNotification from '@/components/c-notification.vue';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
  };

  /**
   * Container for rendering notifications. See /styleguide/notifications for demo.
   */
  export default defineComponent({
    name: 'c-notification-container',

    components: {
      cNotification,
    },

    props: {
      /**
       * Defines which notifications should get displayed in the container.
       */
      selector: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'footer'].includes(value),
      },
    },

    setup(): Setup {
      return {
        notificationStore: useNotificationStore(),
      };
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Gets the filtered notifications depending on the selector.
       */
      filteredNotifications(): MappedNotificationItem[] {
        if (this.selector !== 'default') {
          return this.notificationStore.getNotifications.filter(
            (notification) => notification.selector === this.selector
          );
        }

        return this.notificationStore.getNotifications.filter((notification) => !notification.selector);
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
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
