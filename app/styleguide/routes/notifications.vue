<template>
  <l-default>
    <div v-bem>
      <e-button @click="modalOpen = true">Open modal</e-button>

      <c-notification-container display-type="field"/>
      <e-label :state="errors['first-name'].state" name="First name:" position="top">
        <e-input
          v-model="form.firstName"
          :state="errors['first-name'].state"
          :notification="errors['first-name'].notification"
          name="first-name"
          placeholder="First name"
        />
      </e-label>
      <e-label :state="errors['last-name'].state" name="Last name:" position="top">
        <e-input
          v-model="form.lastName"
          :state="errors['last-name'].state"
          :notification="errors['last-name'].notification"
          name="last-name"
          placeholder="Last name"
        />
      </e-label>
      <e-label :state="errors['email'].state" name="Email:" position="top">
        <e-input
          v-model="form.email"
          :state="errors['email'].state"
          :notification="errors['email'].notification"
          name="email"
          placeholder="email"
        />
      </e-label>

      <e-button @click="addGlobalSuccess">Success</e-button>
      <e-button @click="addGlobalWarning">Warning</e-button>
      <e-button @click="addGlobalError">Error</e-button>
      <e-button @click="addGlobalInfo">Info</e-button>
      <e-button @click="addConfirmation">Confirmation</e-button>
      <e-button @click="addFieldError">Field Error</e-button>

      <div v-bem:selector>
        <c-notification-container display-type="selector" selector="1"/>
        <e-button style="margin-top: 10px; margin-right: 10px;" @click="addSelectorInfo1">Selector Info (1)</e-button>
      </div>

      <c-modal
        :open="modalOpen"
        title="Example title small"
        size="300"
        @close="modalOpen = false">

        <div>
          <e-button @click="addToCart">Add to cart</e-button>

          <e-label :state="errors['first-name'].state" name="First name:" position="top">
            <e-input
              v-model="form.firstName"
              :state="errors['first-name'].state"
              :notification="errors['first-name'].notification"
              name="first-name"
              placeholder="First name"
            />
          </e-label>
          <e-label :state="errors['last-name'].state" name="Last name:" position="top">
            <e-input
              v-model="form.lastName"
              :state="errors['last-name'].state"
              :notification="errors['last-name'].notification"
              name="last-name"
              placeholder="Last name"
            />
          </e-label>
          <e-label :state="errors['email'].state" name="Email:" position="top">
            <e-input
              v-model="form.email"
              :state="errors['email'].state"
              :notification="errors['email'].notification"
              name="email"
              placeholder="email"
            />
          </e-label>

          <e-button style="margin-top: 10px; margin-right: 10px;" @click="addGlobalSuccess">Success</e-button>
          <e-button style="margin-top: 10px; margin-right: 10px;" @click="addGlobalWarning">Warning</e-button>
          <e-button style="margin-top: 10px; margin-right: 10px;" @click="addGlobalError">Error</e-button>
          <e-button style="margin-top: 10px; margin-right: 10px;" @click="addGlobalInfo">Info</e-button>
          <e-button style="margin-top: 10px; margin-right: 10px;" @click="addFieldError">Field Error</e-button>

          <div v-bem:selector>
            <c-notification-container display-type="selector" selector="1"/>
            <e-button style="margin-top: 10px; margin-right: 10px;" @click="addSelectorInfo1">Selector Info (1)</e-button>
          </div>

        </div>
      </c-modal>
    </div>
  </l-default>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import api from '@/helpers/api';
  import lDefault from '@/components/l-default';
  import cNotificationContainer from '@/components/c-notification-container';
  import notificationData from '../mock-data/api-response/notifications';

  export default {
    name: 'notifications',
    components: {
      lDefault,
      cNotificationContainer,
    },
    data() {
      return {
        modalOpen: false,
        form: {
          firstName: '',
          lastName: '',
          email: '',
        },
        errors: {
          'first-name': {
            state: 'default',
            notification: '',
          },
          'last-name': {
            state: 'default',
            notification: '',
          },
          'email': {
            state: 'default',
            notification: '',
          },
        },
        errorMessage: '',
        errorState: 'default',
      };
    },
    computed: {
      ...mapGetters('notification', [
        'fieldNotifications',
      ]),
    },
    mounted() {
      notificationData.list.forEach(notification => this.pushNotification(notification));
    },
    methods: {
      ...mapMutations('notification', [
        'pushNotification',
        'flushFieldNotifications',
        'popNotification'
      ]),
      addToCart() {
        api.post('/notifications/add-to-cart/success', {}, { title: 'Some title', expire: true });
      },
      addGlobalSuccess() {
        api.post('/notifications/global/success', {}, { title: 'Some title', expire: true });
      },
      addGlobalWarning() {
        api.post('/notifications/global/warning', {}, { title: 'Some title', expire: true });
      },
      addGlobalError() {
        api.post('/notifications/global/error', {}, { title: 'Some title', expire: true });
      },
      addGlobalInfo() {
        api.post('/notifications/global/info', {}, { title: 'Some title', expire: true });
      },
      addConfirmation() {
        this.pushNotification(notificationData[1]);
      },
      addFieldError() {
        this.flushFieldNotifications();
        api.post('/notifications/field/error')
          .then((response) => {
            for (let i = 0; i < this.fieldNotifications.length; i += 1) {
              const notification = this.fieldNotifications[i];

              if (notification.message.source) {
                this.errors[notification.message.source.field].state = notification.message.type;
                this.errors[notification.message.source.field].notification = notification.message.message;
              }
            }

            return Promise.resolve(response);
          });
      },
      addSelectorInfo1() {
        api.post('/notifications/selector/info1', {}, { expire: true });
      },
    }
  };
</script>

<style lang="scss">
  .notifications {
    padding: $spacing--50;

    @include media(sm) {
      margin-left: 400px;
    }

    .e-label,
    .e-button {
      margin-bottom: $spacing--10;
      margin-right: $spacing--10;
    }

    &__selector {
      margin-bottom: $spacing--10;
    }
  }
</style>
