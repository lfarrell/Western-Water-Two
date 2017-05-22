<template>
  <div>
    <arizona-map mapFile="az.counties.json" dataFile="az.csv"></arizona-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Arizona',

    components: {
      arizonaMap: Map
    }

  }
</script>
