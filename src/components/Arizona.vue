<template>
  <div>
    <arizona-map
      mapFile="az.counties.json"
      dataFile="az_load.csv"
      res="Lake Havasu"
      resFile="az.json"
      whichState="AZ"></arizona-map>
    <snow-chart whichState="AZ"></snow-chart>
    <strip-chart stateFile="AZ_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="AZ_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="AZ_precip_all.csv" stripType="precip"></strip-chart>
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
