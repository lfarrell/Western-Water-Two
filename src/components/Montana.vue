<template>
  <div>
    <montana-map
      mapFile="mt.counties.json"
      dataFile="mt_load.csv"
      res="Arrowrock"
      resFile="mt.json"
      whichState="MT"></montana-map>
    <snow-chart whichState="MT"></snow-chart>
    <strip-chart stateFile="MT_drought_all.csv"></strip-chart>
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
      stripChart: StripChart
    }

  }
</script>
