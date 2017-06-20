<template>
  <div>
    <nm-map
      mapFile="nm.counties.json"
      dataFile="nm.csv"
      res="Caballo"
      resFile="nm_all.csv"
      whichState="NM"></nm-map>
    <snow-chart whichState="NM"></snow-chart>
    <strip-chart stateFile="NM_drought_all.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'New_Mexico',

    components: {
      nmMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
