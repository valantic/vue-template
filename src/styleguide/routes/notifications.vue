<template>
  <l-default>
    <div :class="b()">
      <div>
        <!-- Global API Response Messages -->
        <h2 :class="b('label')">
          API Response Messages:
        </h2>
        <e-button @click="getApiResponseMessage('success')">
          Success
        </e-button>
        <e-button @click="getApiResponseMessage('info')">
          Info
        </e-button>
        <e-button @click="getApiResponseMessage('error')">
          Error
        </e-button>

        <!-- Options -->
        <h2 :class="b('label')">
          Options
        </h2>
        <e-button @click="modalIsOpen = true">
          Open Modal
        </e-button>
      </div>
    </div>

    <!-- Modal -->
    <c-modal
      :open.sync="modalIsOpen"
      :header-component="null"
    >
      Example Modal
    </c-modal>
  </l-default>
</template>

<script>
  import api from '@/helpers/api';
  import lDefault from '@/components/l-default';
  import cModal from '@/components/c-modal';

  export default {
    name: 'notifications',
    components: {
      lDefault,
      cModal,
    },
    data() {
      return {
        modalIsOpen: false,
      };
    },
    // computed: {},
    // mounted() {},
    methods: {
      getApiResponseMessage(type) {
        api.post(`/notifications/global/${type}`);
      },
    }
  };
</script>

<style lang="scss">
  .notifications {
    display: flex;
    justify-content: flex-end;

    &__label {
      display: block;
      margin: $spacing--15 0 $spacing--5;
    }

    .e-button:not(:last-of-type) {
      margin-right: $spacing--20;
    }
  }
</style>
