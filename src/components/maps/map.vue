<template>
  <svg id="map" width="670" height="500" vector-effect="non-scaling-stroke">
    <g></g>
  </svg>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'UsMap',

    mounted() {
      let svg = d3.select(this.$el);
      let width = svg.attr('width');
      let height = svg.attr('height');

      /* Draw the map */
      let scale = 1,
        projection = d3.geoAlbersUsa()
          .scale(scale)
          .translate([0,0]);

      d3.queue()
        .defer(d3.json, 'static/data/maps/contig_us.geo.json')
        .await(function(error, map) {
          let path = d3.geoPath().projection(projection);
          let bounds = path.bounds(map);
          scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
          let translation = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
            (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

          // update projection
          projection = d3.geoAlbersUsa().scale(scale).translate(translation);
          path = path.projection(projection);

          let maps = svg.selectAll('path')
            .data(map.features);

          maps.enter()
            .append('path')
            .merge(maps)
            .attr('d', path);

          maps.exit().remove();
        });
    }

  }
</script>

<style scoped>
  #map path {
    /* fill: #d7c7ad; */
    fill: white;
    stroke: white;
    stroke-width: 1.5;
    fill-opacity: 0.2;
    stroke-opacity: 0.3;
  }
</style>
