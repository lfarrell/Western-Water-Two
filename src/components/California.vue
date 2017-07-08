<template>
  <div>
    <california-map
      mapFile="ca.counties.json"
      dataFile="ca_load.csv"
      res="Shasta Dam"
      resFile="ca.json"
      whichState="CA"></california-map>
    <snow-chart whichState="CA"></snow-chart>
    <strip-chart stateFile="CA_drought_all.csv"></strip-chart>
    <drought-map mapFile="ca.counties.json"
                 centersFile="ca_centers.json"
                 dataFile="ca-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'California',

    components: {
      californiaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
