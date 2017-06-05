<template>
  <div>
    <california-map
      mapFile="ca.counties.json"
      dataFile="ca.csv"
      res="Shasta Dam"
      resFile="ca_all.csv"
      whichState="CA"></california-map>
    <snow-chart whichState="CA"></snow-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';

  export default {
    name: 'California',

    components: {
      californiaMap: Map,
      snowChart: SnowChart
    }

  }
</script>
