<template>
  <div :class="b()">
    <h1>Google Maps</h1>
    <c-google-maps :class="b('google-map')"
                   :locations="locations"
                   theme="gray"
    />

    <c-google-maps :class="b('google-map')"
                   :locations="locations"
                   theme="gray"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cGoogleMaps from '@/components/c-google-maps.vue';

  export default defineComponent({
    name: 'r-google-maps',
    components: {
      cGoogleMaps,
    },

    // props: {},
    data() {
      return {
        locations: [{
          lat: 19.1759668,
          lng: 72.79504659999998,
          geocode: 'https://goo.gl/maps/9Yu9wb6uidAMs1SEA',
          title: 'Aksa Beach',
          description: 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.',
        }],
      };
    },

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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .r-google-maps {
    // Add specific styles.
  }
</style>
