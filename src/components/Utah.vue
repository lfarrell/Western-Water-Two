<template>
  <div>
    <utah-map
      mapFile="ut.counties.json"
      dataFile="utah_load.csv"
      res="Steinaker"
      resFile="utah.json"
      whichState="UT"></utah-map>
    <snow-chart whichState="UT"></snow-chart>
    <strip-chart stateFile="UT_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="UT_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="UT_precip_all.csv" stripType="precip"></strip-chart>
    <drought-map mapFile="ut.counties.json"
                 centersFile="ut_centers.json"
                 dataFile="ut-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Utah',

    components: {
      utahMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
