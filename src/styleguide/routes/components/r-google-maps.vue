<template>
  <div :class="b()">
    <h1>Google Maps</h1>
    <c-google-maps
      :class="b('google-map')"
      :locations="locations"
      theme="gray"
    />

    <c-google-maps
      :class="b('google-map')"
      :locations="locations"
      theme="gray"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cGoogleMaps, { GoogleMapsLocation } from '@/components/c-google-maps.vue';

  export default defineComponent({
    name: 'r-google-maps',
    components: {
      cGoogleMaps,
    },

    // props: {},
    data() {
      return {
        locations: [
          {
            lat: 19.1759668,
            lng: 72.79504659999998,
            geocode: 'Breitfeldstrasse 13, 9015 St.Gallen',
            title: 'Aksa Beach',
          },
        ] satisfies GoogleMapsLocation[],
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
