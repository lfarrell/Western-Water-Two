<template>
  <div>
    <washington-map
      mapFile="wa.counties.json"
      dataFile="wa.csv"
      res="Grand Coulee/FDR Lake"
      resFile="wa_all.csv"
      whichState="WA"></washington-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Washington',

    components: {
      washingtonMap: Map
    }

  }
</script>
