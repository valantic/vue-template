import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

/**
 * Mixin can be included in components which needs a custom theme style class.
 * Per default it uses the global defined theme in the store/modules/session. It can be overwritten
 * with the prop "customTheme"
 *
 * @mixin
 */
export default defineComponent({
  props: {
    /**
     * Custom theme to overwrite the global defined theme id
     */
    customTheme: {
      type: String,
      default: null
    },
  },

  computed: {
    ...mapGetters('session', [
      'getTheme',
    ]),

    /**
     * Get's a Object with the active theme (global theme if nothing specific is defined).
     *
     * @returns {String}   active theme id for BEM class name
     */
    theme(): string {
      return this.customTheme ? this.customTheme : this.getTheme;
    },
  }
});
