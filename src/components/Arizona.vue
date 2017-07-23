<template>
  <div>
    <arizona-map
      mapFile="az.counties.json"
      dataFile="az_load.csv"
      res="Lake Havasu"
      resFile="az.json"
      :startText="startText"
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
    },

    data() {
      return {
        startText: `Arizona relies heavily on ground water as well as water from the Colorado river. Notice the
        ring of reservoirs on the state's borders. A second string of reservoirs on the Salt River in the
        interior of the state supply Phoenix with much of its water.`
      }
    }

  }
</script>
