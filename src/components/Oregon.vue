<template>
  <div>
    <oregon-map
      mapFile="or.counties.json"
      dataFile="or.csv"
      res="Warm Springs Reservoir"
      resFile="or_all.csv"
      whichState="OR"></oregon-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Oregon',

    components: {
      oregonMap: Map
    }

  }
</script>
