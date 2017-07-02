<template>
  <div>
    <texas-map
      mapFile="tx.counties.json"
      dataFile="texas_resv.csv"
      res="Meredith"
      resFile="tx_all.csv"
      whichState="TX"></texas-map>
    <strip-chart stateFile="TX_drought_all.csv"></strip-chart>
    <drought-map mapFile="tx.counties.json"
                 centersFile="tx_centers.json"
                 dataFile="tx-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Texas',

    components: {
      texasMap: Map,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
