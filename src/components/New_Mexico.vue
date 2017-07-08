<template>
  <div>
    <nm-map
      mapFile="nm.counties.json"
      dataFile="nm_load.csv"
      res="Caballo"
      resFile="nm.json"
      whichState="NM"></nm-map>
    <snow-chart whichState="NM"></snow-chart>
    <strip-chart stateFile="NM_drought_all.csv"></strip-chart>
    <drought-map mapFile="nm.counties.json"
                 centersFile="nm_centers.json"
                 dataFile="nm-counties.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'New_Mexico',

    components: {
      nmMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    }

  }
</script>
