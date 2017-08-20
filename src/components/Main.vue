<template>
  <div>
    <main-map
      mapFile="contig_us.geo.json"
      dataFile="all_load.csv"
      res="Shasta Dam"
      resFile="all_resv.json"
      :hasKey="hasKey"
      whichState="none"></main-map>
    <snow-chart whichState="main"></snow-chart>
    <strip-chart stateFile="munged_drought_all.csv" stripType="drought"></strip-chart>
    <strip-chart stateFile="munged_temp_all.csv" stripType="temp"></strip-chart>
    <strip-chart stateFile="munged_precip_all.csv" stripType="precip"></strip-chart>
    <drought-map mapFile="western_us.json"
                 centersFile="all_centers.json"
                 dataFile="all.csv"></drought-map>
  </div>
</template>

<script>
  import Map from './Map.vue';
  import SnowChart from './SnowChart.vue';
  import StripChart from './StripChart.vue';
  import DroughtMap from './DroughtMap.vue';

  export default {
    name: 'Main',

    components: {
      mainMap: Map,
      snowChart: SnowChart,
      stripChart: StripChart,
      droughtMap: DroughtMap
    },

    data() {
      return {
        hasKey: true
      }
    }
  }
</script>
