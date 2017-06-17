<template>
  <div>
    <idaho-map
      mapFile="id.counties.json"
      dataFile="id.csv"
      res="Arrowrock"
      resFile="id_all.csv"
      whichState="ID"></idaho-map>
    <snow-chart whichState="ID"></snow-chart>
    <strip-chart stateFile="az.csv"></strip-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';

  export default {
    name: 'Idaho',

    components: {
      idahoMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart
    }

  }
</script>
