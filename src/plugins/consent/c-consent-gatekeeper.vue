<template>
  <slot v-if="hasGivenConsent"></slot>
  <div
    v-else
    :class="b()"
  >
    {{ consentMessage || $t('c-consent-gatekeeper.noConsentMessage', { consentGroup }) }}
    <e-button @click="showConsentDialog">
      {{ $t('c-consent-gatekeeper.showConsentButtonLabel') }}
    </e-button>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import eButton from '@/elements/e-button.vue';
  import { ConsentGroup, consentState, showConsentDialog } from '@/plugins/consent/index';

  type Setup = {
    showConsentDialog: typeof showConsentDialog;
    consentState: typeof consentState;
  };

  // type Data = {}

  /**
   * TODO: if you want to use this component make sure to register and enable cookiebot.com first.
   *
   * Can be wrapped around a component to prevent rendering, until the related consent has been given.
   *
   * For scripts, that are added to the page on server side, make sure you use the approach described in step 4 on
   * https://www.cookiebot.com/en/manual-implementation/
   */
  export default defineComponent({
    name: 'c-consent-gatekeeper',
    components: {
      eButton,
    },

    // components: {},

    props: {
      /**
       * Expects a valid consent group.
       */
      consentGroup: {
        type: String as PropType<ConsentGroup>,
        required: true,
      },

      /**
       * Allows to display a specific consent message.
       */
      consentMessage: {
        type: String,
        default: null,
      },
    },
    emits: {
      approved: () => true,
    },

    setup(): Setup {
      return {
        showConsentDialog,
        consentState,
      };
    },
    // data(): Data {
    //   return {};
    // },

    computed: {
      hasGivenConsent(): boolean {
        return !!this.consentState.consent[this.consentGroup];
      },
    },
    watch: {
      hasGivenConsent: {
        immediate: true,
        handler(value): void {
          if (value) {
            this.$emit('approved');
          }
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '@/setup/scss/variables';

  .c-consent-gatekeeper {
    display: flex;
    gap: variables.$spacing--30;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: variables.$spacing--50 variables.$spacing--20;
    border: 3px solid variables.$color-primary--1;
    background: variables.$color-grayscale--1000;
  }
</style>
