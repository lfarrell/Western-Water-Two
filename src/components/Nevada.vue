<template>
  <div>
    <nevada-map
      mapFile="nv.counties.json"
      dataFile="nv.csv"
      res="Lake Mead"
      resFile="nv_all.csv"
      whichState="NV"></nevada-map>
    <snow-chart whichState="NV"></snow-chart>
    <strip-chart stateFile="NV_drought_all.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Nevada',

    components: {
      nevadaMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
