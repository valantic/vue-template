<template>
  <div :class="b()">
    <c-consent-gatekeeper
      :consent-group="ConsentGroup.Necessary"
      consent-message="An active Cookiebot.com plan/integration is required to enable this page."
      @approved="onConsentApprove"
    >
      Consent sensitive content.
    </c-consent-gatekeeper>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ConsentGroup, cConsentGatekeeper } from '@/plugins/consent';

  type Setup = {
    ConsentGroup: typeof ConsentGroup;
  };

  // type Data = {}

  /**
   * Showcase for the consent plugin.
   */
  export default defineComponent({
    name: 'r-consent',
    components: {
      cConsentGatekeeper,
    },

    // components: {},

    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        ConsentGroup,
      };
    },
    // data(): Data {
    //   return {};
    // },

    // computed: {},
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

    methods: {
      onConsentApprove(): void {
        alert('Consent approved.'); // eslint-disable-line no-alert
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // @use '@/setup/scss/variables';

  .r-consent {
    // ...
  }
</style>
