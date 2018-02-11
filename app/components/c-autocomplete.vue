<template>
  <div :class="b()">
    <input type="text" :class="b('input')" @input="updateSuggestions">
    <div :class="b('dropdown-wrapper')">
      <ul :class="b('suggestions')">
        <li :class="b('suggestions-item')"
            v-for="suggestion in suggestions"
            :key="suggestion.text">{{ suggestion.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  let debounceTimeout;

  /**
   * TODO: how to include json-server in styleguide build?
   */

  export default {
    name: 'c-autocomplete',
    data() {
      return {
        suggestions: [],
      };
    },
    methods: {
      requestSuggestions() {
        const value = this.suggestions;

        this.$axios.get('/suggestions', { term: value }).then((response) => {
          this.suggestions = response.data;
        });
      },
      updateSuggestions() {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
          this.requestSuggestions();
        }, 500);
      },
    },
  };
</script>

<style lang="scss">
  // .c-autocomplete {}
</style>
