<template>
  <div>
    <arizona-map
      mapFile="az.counties.json"
      dataFile="az.csv"
      res="Lake Havasu"
      resFile="az_all.csv"
      whichState="AZ"></arizona-map>
    <snow-chart whichState="AZ"></snow-chart>
    <strip-chart stateFile="AZ_drought_all.csv"></strip-chart>
    <drought-map mapFile="az.counties.json"
      centersFile="az_centers.json"
      dataFile="az-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Arizona',

    components: {
      arizonaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
