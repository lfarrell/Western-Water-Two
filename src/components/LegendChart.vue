<template>
  <svg width="1000" height="90">
    <g id="legend" width="1000" transform="translate(20,20)"></g>
  </svg>
</template>

<script>
  import * as d3 from 'd3';
  import legend from 'd3-svg-legend'

  export default {
    name: 'LegendChart',

    data() {
      return {
          width: window.innerWidth - 100
      }
    },

    props: {
      colors: Array,
      dataValues: Array,
      field: String
    },

    methods: {
      legendScales() {
        let vm = this;
        return d3.scaleQuantile()
          .domain(d3.extent(this.dataValues, function(d) { return +d[vm.field]; }))
          .range(this.colors);
      },

      legendSquare() {
        let legend_scales = this.legendScales();

        return legend.legendColor()
          .shapeWidth(70)
          .orient('horizontal')
          .labelFormat(d3.format(".01f"))
          .scale(legend_scales);
      },

      draw() {
        let svg = d3.select('#legend');
        let legend_scale = this.legendSquare();

        svg.call(legend_scale);
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
