<template>
  <div>
    <utah-map
      mapFile="ut.counties.json"
      dataFile="utah.csv"
      res="Steinaker"
      resFile="utah_all.csv"
      whichState="UT"></utah-map>
    <snow-chart whichState="UT"></snow-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';

  export default {
    name: 'Utah',

    components: {
      utahMap: Map,
      snowChart: SnowChart
    }

  }
</script>
