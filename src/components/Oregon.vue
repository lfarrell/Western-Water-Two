<template>
  <div>
    <oregon-map
      mapFile="or.counties.json"
      dataFile="or_load.csv"
      res="Lake Owyhee"
      resFile="or.json"
      whichState="OR"></oregon-map>
    <snow-chart whichState="OR"></snow-chart>
    <strip-chart stateFile="OR_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="OR_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="OR_precip_all.csv" stripType="precip"></strip-chart>
    <drought-map mapFile="or.counties.json"
                 centersFile="or_centers.json"
                 dataFile="or-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Oregon',

    components: {
      oregonMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
