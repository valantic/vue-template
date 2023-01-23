<template>
  <l-default>
    <c-google-map theme="gray" :locations="locations" :class="b('google-map')" />
  </l-default>
</template>

<script>
  import cGoogleMap from '@/components/c-google-maps.vue';

  export default {
    name: 'icons',
    components: {
      cGoogleMap
    },
    // mixins: [],

    // props: {},
    data() {
      return {
        locations: [{
          lat: 19.1759668,
          lng: 72.79504659999998,
          geocode: 'https://goo.gl/maps/9Yu9wb6uidAMs1SEA',
          title: 'Aksa Beach',
          description: 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
        }]
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
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>
