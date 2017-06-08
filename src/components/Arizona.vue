<template>
  <div>
    <arizona-map
      mapFile="az.counties.json"
      dataFile="az.csv"
      res="Lake Havasu"
      resFile="az_all.csv"
      whichState="AZ"></arizona-map>
    <snow-chart whichState="AZ"></snow-chart>
    <strip-chart stateFile="az.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Arizona',

    components: {
      arizonaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
