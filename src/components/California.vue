<template>
  <div>
    <california-map
      mapFile="ca.counties.json"
      dataFile="ca.csv"
      res="Shasta Dam"
      resFile="ca_all.csv"
      whichState="CA"></california-map>
    <snow-chart whichState="CA"></snow-chart>
    <strip-chart stateFile="az.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'California',

    components: {
      californiaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
