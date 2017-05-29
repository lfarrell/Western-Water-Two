<template>
  <div>
    <wyoming-map
      mapFile="wy.counties.json"
      dataFile="wy.csv"
      res="Fontenelle"
      resFile="wy_all.csv"
      whichState="WY"></wyoming-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Wyoming',

    components: {
      wyomingMap: Map
    }

  }
</script>
