<template>
  <div>
    <california-map
      mapFile="ca.counties.json"
      dataFile="ca.csv"
      res="Shasta Dam"
      resFile="ca_all.csv"
      whichState="CA"></california-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'California',

    components: {
      californiaMap: Map
    }

  }
</script>
