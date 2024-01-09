<template>
  <div :class="b()">
    <c-consent-gatekeeper :consent-group="ConsentGroup.Necessary" @approved="onConsentApprove">
      Consent sensitive content.
    </c-consent-gatekeeper>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { cConsentGatekeeper, ConsentGroup } from '@/plugins/consent';

  interface Setup {
    ConsentGroup: typeof ConsentGroup;
  }

  // interface Data {}

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
      onConsentApprove() {
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
