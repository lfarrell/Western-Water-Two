<template>
  <div>
    <colorado-map
      mapFile="co.counties.json"
      dataFile="co.csv"
      res="Vallecito"
      resFile="co_all.csv"
      whichState="CO"></colorado-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Colorado',

    components: {
      coloradoMap: Map
    }

  }
</script>
