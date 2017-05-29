<template>
  <div>
    <nevada-map
      mapFile="nv.counties.json"
      dataFile="nv.csv"
      res="Lake Mead"
      resFile="nv_all.csv"
      whichState="NV"></nevada-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Nevada',

    components: {
      nevadaMap: Map
    }

  }
</script>
