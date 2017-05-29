<template>
  <div>
    <idaho-map
      mapFile="id.counties.json"
      dataFile="id.csv"
      res="Arrowrock"
      resFile="id_all.csv"
      whichState="ID"></idaho-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Idaho',

    components: {
      idahoMap: Map
    }

  }
</script>
