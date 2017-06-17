<template>
  <div>
    <wyoming-map
      mapFile="wy.counties.json"
      dataFile="wy.csv"
      res="Fontenelle"
      resFile="wy_all.csv"
      whichState="WY"></wyoming-map>
    <snow-chart whichState="WY"></snow-chart>
    <strip-chart stateFile="az.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Wyoming',

    components: {
      wyomingMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
