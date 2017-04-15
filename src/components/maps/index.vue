<template>
  <div id="holder">
    <div class="mapHolder">
      <us-map/>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import UsMap from '@/components/maps/map.vue';

  export default {
    name: 'Index',
    components: {
      usMap: UsMap
    }
  }
</script>

<style scoped>

</style>
