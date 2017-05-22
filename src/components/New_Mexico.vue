<template>
  <div>
    <texas-map mapFile="nm.counties.json" dataFile="nm.csv"></texas-map>
  </div>
</template>

<script>
  import Map from './Map.vue';

  export default {
    name: 'New_Mexico',

    components: {
      texasMap: Map
    }

  }
</script>
