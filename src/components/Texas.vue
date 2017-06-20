<template>
  <div>
    <texas-map
      mapFile="tx.counties.json"
      dataFile="texas_resv.csv"
      res="Meredith"
      resFile="tx_all.csv"
      whichState="TX"></texas-map>
    <strip-chart stateFile="TX_drought_all.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Texas',

    components: {
      texasMap: Map,
      stripChart: StripChart
    }

  }
</script>
