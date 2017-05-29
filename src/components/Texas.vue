<template>
  <div>
    <texas-map
      mapFile="tx.counties.json"
      dataFile="texas_resv.csv"
      res="Meredith"
      resFile="tx_all.csv"
      whichState="TX"></texas-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Texas',

    components: {
        texasMap: Map
    }

  }
</script>
