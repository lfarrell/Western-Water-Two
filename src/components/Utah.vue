<template>
  <div>
    <utah-map
      mapFile="ut.counties.json"
      dataFile="utah.csv"
      res="Steinaker"
      resFile="utah_all.csv"
      whichState="UT"></utah-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Utah',

    components: {
      utahMap: Map
    }

  }
</script>
