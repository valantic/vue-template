<template>
  <div :class="b({ showSuggestion: hasSuggestions })" @click="onClick" @keydown="onKeyDown">
    <div :class="b('search')">
      <form :action="formActionUrl" @submit.capture="submitSearchQuery">
        <e-input ref="eInput"
                 v-model="searchTerm"
                 :placeholder="placeholderText"
                 :title="$t('c-search.input')"
                 :focus-shadow="false"
                 :select-on-focus="true"
                 :name="searchQueryParamName"
                 autocomplete="off"
                 type="search"
                 border="0"
                 tabindex="0"
                 @input="onInput"
                 @click="onClick"
        >
          <button v-if="searchTerm"
                  :class="b('button', { close: true })"
                  :title="$t('c-search.removeSearchTerm')"
                  type="reset"
                  tabindex="-1"
                  @click="removeSearchQuery">
            <e-icon :class="b('icon')"
                    :inline="true"
                    :alt="$t('c-search.removeSearchTerm')"
                    icon="i-close"
                    width="15"
                    height="15"
                    tabindex="-1"/>
            <span class="invisible">{{ $t('c-search.removeSearchTerm') }}</span>
          </button>
          <button :title="$t('c-search.searchButton')"
                  :class="b('button', { search: true })"
                  type="submit"
                  tabindex="-1">
            <e-icon :class="b('icon')"
                    :inline="true"
                    :alt="$t('c-search.searchButton')"
                    icon="i-search"
                    tabindex="-1"/>
            <span class="invisible">{{ $t('c-search.removeSearchTerm') }}</span>
          </button>
        </e-input>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import getUrlParameter from '@/helpers/get-url-parameter';
  import bodyScroll from '@/helpers/body-scroll';
  import viewport from '@/services/viewport';

  let debounceTimeout;

  /**
   * The c-search component renders a input field which triggers the search suggestions.
   * It redirects the user to the search URL by enter or click the search button.
   */
  export default {
    name: 'c-search',
    // components: {},
    // mixins: [],

    props: {

      /**
       * @type {String} Sets a placeholder attribute for the input field.
       */
      placeholder: {
        type: String,
        default: null,
      },

      /**
       * @type {String} The search URL which is called for the search results.
       */
      searchUrl: {
        type: String,
        default: '/search'
      },

      /**
       * @type {String} Defines the search query parameter name, default is "q".
       */
      searchQueryParamName: {
        type: String,
        default: 'q'
      }
    },

    data() {
      return {
        /**
         * @type {Number} Saves the current focused suggestion entry (default > length).
         */
        currentKeyBoardPosition: Infinity, // Value have to be larger then the amount of products to display.

        /**
         * @type {String} Saves the style attribute "top" value of the suggestion wrapper.
         */
        topPosition: 'auto',

        /**
         * @type {Object} Contains the current focused DOM element.
         */
        focusedItem: null,
      };
    },

    computed: {
      ...mapGetters('search', [
        'hasSuggestions',
        'searchSuggestions',
      ]),
      ...mapGetters('session', [
        'headerHeight',
      ]),
      searchTerm: {
        get() {
          return this.$store.getters['search/searchTerm'];
        },
        set(value) {
          this.$store.commit('search/setSearchTerm', value);
        }
      },
      placeholderText() {
        return this.$props.placeholder || this.$t('c-search.placeholder');
      },
      formActionUrl() {
        return `/${this.$i18n.locale}${this.searchUrl}`;
      },
    },
    watch: {
      searchTerm() {
        if (!this.searchTerm || this.searchTerm.length < 2) {
          this.$store.commit('search/resetSearchSuggestions');
          this.resetKeyBoardPosition();
        }
      },
      hasSuggestions() {
        if (this.hasSuggestions) {
          this.setSuggestionPosition();

          bodyScroll(viewport.isSm);

          window.addEventListener('click', this.resetSearchSuggestions);
        } else {
          bodyScroll(true);
          window.removeEventListener('click', this.resetSearchSuggestions);
        }
      },
    },

    // beforeCreate() {},
    created() {
      window.addEventListener('resizeend', this.setSuggestionPosition);
    },
    // beforeMount() {},
    mounted() {
      const urlQuery = this.getSearchQueryFromUrl();

      if (urlQuery) {
        this.searchTerm = urlQuery;
        this.saveTermToLocalStorage();
      } else {
        this.getSearchTermFromLocalStorage();
      }

      /**
       * Listens to the addToCartFinished event bus and resets keyboard and focus the input field.
       */
      this.$eventBus.$on('c-search-product-item.addToCartFinished', (payload) => {
        const searchProductItem = payload.component;

        if (this.$el.contains(searchProductItem.$el)) {
          this.resetKeyBoardPosition();
          this.$refs.eInput.$refs.input.focus();
        }
      });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('resizeend', this.setSuggestionPosition);
    },

    methods: {
      ...mapMutations('navigation', [
        'setMobileNavigationState',
      ]),

      ...mapActions('search', [
        'saveTermToLocalStorage',
        'getSearchTermFromLocalStorage',
        'getSearchSuggestions',
      ]),

      /**
       * Emits the input event to the parent component.
       *
       * @param {String} value - Value to be passed.
       */
      onInput(value) {
        clearTimeout(debounceTimeout);

        this.setMobileNavigationState(false);

        debounceTimeout = setTimeout(() => {
          this.getSearchSuggestions();
        }, 200);
        this.$emit('input', value);
      },

      /**
       * Emits the click event to the parent component.
       *
       * @param {Event} event - Click event.
       */
      onClick(event) {
        this.resetKeyBoardPosition();

        if (this.hasSuggestions) {
          event.stopPropagation();
        }

        if (this.searchTerm && this.searchTerm.length >= 2) {
          this.getSearchSuggestions();
        }

        this.$emit('click', event);
      },

      /**
       * Submits the current searchTerm which is a redirect to a hardcoded search URL.
       *
       * @param {Event} event - The submit event.
       */
      submitSearchQuery(event) {
        if (this.searchTerm) {
          this.saveTermToLocalStorage();
        } else {
          event.preventDefault();
        }
      },

      /**
       * Removes the current searchTerm and focuses the input field for search for another term.
       */
      removeSearchQuery() {
        this.searchTerm = '';
        this.saveTermToLocalStorage();

        /**
         * Emits a blur event to the parent component to lose the search focus.
         *
         * @event blur
         *
         * @type {Object} payload.remove
         */
        this.$emit('blur', { remove: true });
      },

      /**
       * Returns the optional URL search parameter "q".
       *
       * @returns {String}
       */
      getSearchQueryFromUrl() {
        return getUrlParameter(this.$props.searchQueryParamName);
      },

      /**
       * Resets the current search suggestions in the store.
       */
      resetSearchSuggestions() {
        this.$store.commit('search/resetSearchSuggestions');
        this.resetKeyBoardPosition();
        this.$refs.eInput.$refs.input.focus();
      },

      /**
       * Sets the correct position of the suggestion wrapper. For mobile it has to be bellow the header.
       */
      setSuggestionPosition() {
        if (this.hasSuggestions && !viewport.isSm) {
          setTimeout(() => {
            this.topPosition = `${this.headerHeight}px`;
          });
        } else if (this.hasSuggestions) {
          setTimeout(() => {
            this.topPosition = 'auto';
          });
        }
      },

      /**
       * Handles the up/down navigation by keyboard.
       *
       * @param {Event} event - The DOM Event.
       *
       * @returns {Boolean}
       */
      onKeyDown(event) {
        if (this.hasSuggestions) {
          const refs = [
            ...this.$refs.suggestions.$refs.categoryItem || [],
            ...this.$refs.suggestions.$refs.productItem || [],
          ];
          const current = this.currentKeyBoardPosition;
          let nextPosition = 0;

          switch (event.keyCode) {
            // Key event up.
            case 38:
              nextPosition = current - 1 >= 0 && current - 1 < refs.length ? current - 1 : refs.length - 1;
              event.preventDefault();
              break;

            // Key event down.
            case 40:
              nextPosition = refs.length > current + 1 ? current + 1 : 0;
              event.preventDefault();
              break;

            default:
              return false;
          }

          this.focusedItem = refs[nextPosition];
          this.currentKeyBoardPosition = nextPosition;
          refs[nextPosition].$el.focus();

          return true;
        }

        return false;
      },

      /**
       * Resets the stored keyboard navigation position.
       */
      resetKeyBoardPosition() {
        this.currentKeyBoardPosition = Infinity;
        this.focusedItem = null;
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-search {
    position: relative;
    height: 100%;
    padding: $spacing--10 0 $spacing--10;

    @include media(md) {
      display: flex;
      align-items: center;
      padding: 0;
    }

    &__search {
      flex: 1 1 auto;
      position: relative;
    }

    &__button {
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    &__button--close {
      margin-right: $spacing--5;
      // 1px spacing is needed to adjust close icon correct.
      padding-top: 1px;

      path {
        fill: $color-grayscale--400;
      }
    }

    &__suggestion-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-grayscale--1000;
      overflow-y: auto;

      @include media(sm) {
        @include z-index(searchSuggestions);

        position: absolute;
        left: auto;
        right: auto;
        top: auto;
        bottom: auto;
        border-top: 2px solid $color-grayscale--600;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        max-height: 80vh;
        box-shadow: 0 2px 4px 0 $color-grayscale--400;
      }
    }

    &--show-suggestion {
      .e-input__field {
        @include media(sm) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  }
</style>
