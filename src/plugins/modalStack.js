/**
 * Adds a modalStack instance to Vue itself, which can be used by calling this.$modalStack.
 */
export default {
  install(Vue) {
    Vue.prototype.$modalStack = new Vue({
      data: {
        /**
         * Holds a list of open modal names (uuid).
         */
        openModals: [],
      },

      created() {
        window.addEventListener('keyup', this.onKeyUp);
      },

      beforeDestroy() {
        window.removeEventListener('keyup', this.onKeyUp);
      },

      methods: {
        /**
         * Keyup event function.
         *
         * @param {Object} event - Native event object.
         */
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
          const uuid = this.openModals[this.openModals.length - 1];

          this.$modal.hide(uuid);
        },

        /**
         * Removes the given modal from the array.
         *
         * @public
         *
         * @param {String} uuid - Name of the modal (uuid).
         */
        remove(uuid) {
          this.openModals.splice(this.openModals.indexOf(uuid), 1);
        },

        /**
         * Adds the given modal to the array.
         *
         * @public
         *
         * @param {String} uuid - Name of the modal (uuid).
         */
        add(uuid) {
          this.openModals.push(uuid);
        }
      },
    });
  }
};
