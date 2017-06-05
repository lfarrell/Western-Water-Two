<template>
  <div>
    <idaho-map
      mapFile="id.counties.json"
      dataFile="id.csv"
      res="Arrowrock"
      resFile="id_all.csv"
      whichState="ID"></idaho-map>
    <snow-chart whichState="ID"></snow-chart>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';

  export default {
    name: 'Idaho',

    components: {
      idahoMap: Map,
      snowChart: SnowChart
    }

  }
</script>
