<template>
  <div>
    <p class="offset-sm-1 col-sm-10 offset-lg-1 col-lg-10 text-top">The western landscape is varied running from desert to rain forest.
      However, most of the region tends towards aridness, requiring concentrated reservoirs and irrigation
      to allow for large scale human use. The map and graph below shows the network of reservoirs across
    the west. Much of the American West has been in and out of drought for most of the 21<sup>st</sup> century. Leading
      to lower average water levels than would be typical. For an example, checkout reservoir levels in California
      in 2015 and most of 2016.
      Click a reservoir to display its levels. Hover over the graph to see the levels for a given month.</p>
    <main-map
      mapFile="western_us.json"
      dataFile="all_load.csv"
      res="Shasta Dam"
      resFile="all_resv.json"
      :hasKey="hasKey"
      whichState="none"></main-map>
    <snow-chart whichState="main"></snow-chart>
    <strip-chart stateFile="munged_drought_all.csv"></strip-chart>
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
