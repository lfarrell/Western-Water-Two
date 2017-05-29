<template>
  <div>
    <arizona-map
      mapFile="az.counties.json"
      dataFile="az.csv"
      res="Lake Havasu"
      resFile="az_all.csv"
      whichState="AZ"></arizona-map>
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
