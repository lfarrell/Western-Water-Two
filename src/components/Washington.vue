<template>
  <div>
    <washington-map mapFile="wa.counties.json" dataFile="wa.csv"></washington-map>
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
