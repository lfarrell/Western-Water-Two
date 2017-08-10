<template>
  <div>
    <montana-map
      mapFile="mt.counties.json"
      dataFile="mt_load.csv"
      res="Lake Koocanusa"
      resFile="mt.json"
      whichState="MT"></montana-map>
    <snow-chart whichState="MT"></snow-chart>
    <strip-chart stateFile="MT_drought_all.csv"></strip-chart>
    <drought-map mapFile="mt.counties.json"
                 centersFile="mt_centers.json"
                 dataFile="mt-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Montana',

    components: {
      montanaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
