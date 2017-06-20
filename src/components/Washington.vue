<template>
  <div>
    <washington-map
      mapFile="wa.counties.json"
      dataFile="wa.csv"
      res="Grand Coulee/FDR Lake"
      resFile="wa_all.csv"
      whichState="WA"></washington-map>
    <snow-chart whichState="WA"></snow-chart>
    <strip-chart stateFile="WA_drought_all.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Washington',

    components: {
      washingtonMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
