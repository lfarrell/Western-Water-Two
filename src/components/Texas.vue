<template>
  <div>
    <texas-map
      mapFile="tx.counties.json"
      dataFile="tx_load.csv"
      res="Meredith"
      resFile="texas_resv.json"
      whichState="TX"></texas-map>
    <strip-chart stateFile="TX_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="TX_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="TX_precip_all.csv" stripType="precip"></strip-chart>
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
