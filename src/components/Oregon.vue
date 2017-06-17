<template>
  <div>
    <oregon-map
      mapFile="or.counties.json"
      dataFile="or.csv"
      res="Warm Springs Reservoir"
      resFile="or_all.csv"
      whichState="OR"></oregon-map>
    <snow-chart whichState="OR"></snow-chart>
    <strip-chart stateFile="az.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Oregon',

    components: {
      oregonMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
