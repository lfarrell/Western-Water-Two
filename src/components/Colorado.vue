<template>
  <div>
    <colorado-map
      mapFile="co.counties.json"
      dataFile="co.csv"
      res="Vallecito"
      resFile="co_all.csv"
      whichState="CO"></colorado-map>
    <snow-chart whichState="CO"></snow-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';

  export default {
    name: 'Colorado',

    components: {
      coloradoMap: Map,
      snowChart: SnowChart
    }

  }
</script>
