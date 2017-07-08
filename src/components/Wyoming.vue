<template>
  <div>
    <wyoming-map
      mapFile="wy.counties.json"
      dataFile="wy_load.csv"
      res="Fontenelle"
      resFile="wy.json"
      whichState="WY"></wyoming-map>
    <snow-chart whichState="WY"></snow-chart>
    <strip-chart stateFile="WY_drought_all.csv"></strip-chart>
    <drought-map mapFile="wy.counties.json"
                 centersFile="wy_centers.json"
                 dataFile="wy-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Wyoming',

    components: {
      wyomingMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
