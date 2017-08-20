<template>
  <div>
    <idaho-map
      mapFile="id.counties.json"
      dataFile="id_load.csv"
      res="Arrowrock"
      resFile="id.json"
      whichState="ID"></idaho-map>
    <snow-chart whichState="ID"></snow-chart>
    <strip-chart stateFile="ID_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="ID_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="ID_precip_all.csv" stripType="precip"></strip-chart>
    <drought-map mapFile="id.counties.json"
                 centersFile="id_centers.json"
                 dataFile="id-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Idaho',

    components: {
      idahoMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
