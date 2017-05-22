<template>
  <div>
    <utah-map mapFile="ut.counties.json" dataFile="utah.csv"></utah-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'Utah',

    components: {
      utahMap: Map
    }

  }
</script>
