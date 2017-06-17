<template>
  <div>
    <colorado-map
      mapFile="co.counties.json"
      dataFile="co.csv"
      res="Vallecito"
      resFile="co_all.csv"
      whichState="CO"></colorado-map>
    <snow-chart whichState="CO"></snow-chart>
    <strip-chart stateFile="az.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Colorado',

    components: {
      coloradoMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
