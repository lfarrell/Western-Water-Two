<template>
  <div>
    <nevada-map
      mapFile="nv.counties.json"
      dataFile="nv_load.csv"
      res="Lake Mead"
      resFile="nv.json"
      whichState="NV"></nevada-map>
    <snow-chart whichState="NV"></snow-chart>
    <strip-chart stateFile="NV_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="NV_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="NV_precip_all.csv" stripType="precip"></strip-chart>
    <drought-map mapFile="nv.counties.json"
                 centersFile="nv_centers.json"
                 dataFile="nv-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Nevada',

    components: {
      nevadaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
