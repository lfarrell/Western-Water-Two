<template>
  <div>
    <colorado-map
      mapFile="co.counties.json"
      dataFile="co_load.csv"
      res="Vallecito"
      resFile="co.json"
      whichState="CO"></colorado-map>
    <snow-chart whichState="CO"></snow-chart>
    <strip-chart stateFile="CO_drought_all.csv"></strip-chart>
    <drought-map mapFile="co.counties.json"
                 centersFile="co_centers.json"
                 dataFile="co-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Colorado',

    components: {
      coloradoMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
