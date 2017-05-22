<template>
  <div>
    <wyoming-map mapFile="wy.counties.json" dataFile="wy.csv"></wyoming-map>
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
