<template>
  <div>
    <washington-map
      mapFile="wa.counties.json"
      dataFile="wa_load.csv"
      res="Grand Coulee/FDR Lake"
      resFile="wa.json"
      whichState="WA"></washington-map>
    <snow-chart whichState="WA"></snow-chart>
    <strip-chart stateFile="WA_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="WA_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="WA_precip_all.csv" stripType="precip"></strip-chart>
    <drought-map mapFile="wa.counties.json"
                 centersFile="wa_centers.json"
                 dataFile="wa-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Washington',

    components: {
      washingtonMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
