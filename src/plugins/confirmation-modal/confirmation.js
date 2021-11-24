import cConfirmationModal from './c-confirmation-modal';

/**
 * Confirmation modal handling.
 * Can get called by this.$confirmation.showConfirmation() and resolves a Promise if it's confirmed.
 */
export default {
  install(Vue /* , options */) {
    Vue.component(cConfirmationModal.name, cConfirmationModal);

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$confirmation = new Vue({
      data: {
        confirmation: null,
      },
      methods: {
        // eslint-disable-next-line vue/no-unused-properties
        showConfirmation(payload) {
          return new Promise((resolve, reject) => {
            this.confirmation = { resolve, reject, payload };
          })
          .catch(() => Promise.reject(new Error('Confirmation cancelled'))) // Makes sure we don't get a console error.
          .finally(() => {
            this.confirmation = null;
          });
        }
      }
    });
  },
};
