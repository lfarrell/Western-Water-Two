<template>
  <div>
    <idaho-map mapFile="id.counties.json" dataFile="id.csv"></idaho-map>
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
