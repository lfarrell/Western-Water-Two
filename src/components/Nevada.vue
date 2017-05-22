<template>
  <div>
    <nevada-map mapFile="nv.counties.json" dataFile="nv.csv"></nevada-map>
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
