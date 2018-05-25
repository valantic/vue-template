import { Component as Vuedal } from 'vuedals';

export default {
  components: {
    Vuedal
  },
  methods: {
    // eslint-disable-next-line id-length
    onClick(event) {
      // eslint-disable-next-line no-console
      console.log('You clicked:', event.target);
    }
  }
};
