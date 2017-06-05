<template>
  <div>
    <oregon-map
      mapFile="or.counties.json"
      dataFile="or.csv"
      res="Warm Springs Reservoir"
      resFile="or_all.csv"
      whichState="OR"></oregon-map>
    <snow-chart whichState="OR"></snow-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';

  export default {
    name: 'Oregon',

    components: {
      oregonMap: Map,
      snowChart: SnowChart
    }

  }
</script>
