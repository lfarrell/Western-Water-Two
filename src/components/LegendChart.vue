<template>
  <svg :width="width" height="90" :transform="translate">
    <g :id="field" :width="width"></g>
  </svg>
</template>

<script>
  import * as d3 from 'd3';
  import legend from 'd3-svg-legend'

  export default {
    name: 'LegendChart',

    data() {
      return {
        width: window.innerWidth - 100,
        translate: `translate(${(window.innerWidth - 870) / 2},20)`
      }
    },

    props: {
      colors: Array,
      dataValues: Array,
      field: String
    },

    watch: {
      dataValues: function(val) {
        this.dataValues = val;
        this.draw();
      }
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
        let svg = d3.select(`#${this.field}`);
        let legend_scale = this.legendSquare();

        svg.call(legend_scale);
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
