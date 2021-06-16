import { reactive, Plugin } from 'vue';

/**
 * Adds a modalStack instance to Vue itself, which can be used by calling this.$modalStack.
 */
const plugin: Plugin = {
  install(app) {
    // @ts-ignore
    app.config.globalProperties.$modalStack = reactive({
      data: {
        /**
         * Holds a list of open modal names (uuid).
         */
        openModals: [],
      },

      created() {
        // @ts-ignore
        window.addEventListener('keyup', this.onKeyUp);
      },

      beforeUnmount() {
        // @ts-ignore
        window.removeEventListener('keyup', this.onKeyUp);
      },

      methods: {
        /**
         * Keyup event function.
         *
         * @param {Object} event - Native event object.
         */
        // @ts-ignore
        onKeyUp(event) {
          if (event.keyCode === 27) {
            this.hideTopModal();
          }
        },

        /**
         * Hides the latest modal in the array.
         *
         * @public
         */
        hideTopModal() {
          // @ts-ignore
          const uuid = this.openModals[this.openModals.length - 1];

          // @ts-ignore
          this.$modal.hide(uuid);
        },

        /**
         * Removes the given modal from the array.
         *
         * @public
         *
         * @param {String} uuid - Name of the modal (uuid).
         */
        remove(uuid: string) {
          // @ts-ignore
          this.openModals.splice(this.openModals.indexOf(uuid), 1);
        },

        /**
         * Adds the given modal to the array.
         *
         * @public
         *
         * @param {String} uuid - Name of the modal (uuid).
         */
        add(uuid: string) {
          // @ts-ignore
          this.openModals.push(uuid);
        }
      },
    });
  }
};

export default plugin;
