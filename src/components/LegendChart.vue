<template>
  <svg :width="width" :height="height" :transform="translate">
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
        width: '',
        height: '',
        translate: `translate(${(window.innerWidth - 870) / 2},20)`
      }
    },

    props: {
      colors: Array,
      dataValues: Array,
      field: String,
      legendType: String
    },

    watch: {
      dataValues: function(val) {
        this.dataValues = val;
        this.draw();
      }
    },

    methods: {
      circleSizing() {
          let sizing;

          if (window.innerWidth < 500) {
            sizing = [1, 6];
          } else {
            sizing = [2, 20];
          }

          return sizing;
      },

      legendOrientation() {
        let screen_width = window.innerWidth;
        let size, orientation;

        if(screen_width < 1000) {
          size = 40;
          orientation = 'vertical';
        } else {
          size = 70;
          orientation = 'horizontal';
        }

        if(orientation === 'vertical') {
          this.height = 210;
          this.width = 200;
          this.translate = 'translate(0,0)';
        } else {
          this.height = 90;
          this.width = screen_width - 100;
          this.translate = `translate(${(screen_width - 870) / 2},20)`
        }

        return {size: size, orientation: orientation};
      },

      legendSquare() {
        let legend_scales = d3.scaleQuantile()
          .domain(d3.extent(this.dataValues, (d) => { return +d[this.field]; }))
          .range(this.colors);
        let configs = this.legendOrientation();

        return legend.legendColor()
          .shapeWidth(configs.size)
          .orient(configs.orientation)
          .labelFormat(d3.format(".01f"))
          .scale(legend_scales);
      },

      legendCircle() {
        let legend_scales = d3.scaleSqrt()
          .domain(d3.extent(this.dataValues, (d) => { return +d[this.field]; }))
          .range(this.circleSizing());
        let configs = this.legendOrientation();

        return legend.legendSize()
          .scale(legend_scales)
          .shape('circle')
          .shapePadding(30)
          .labelOffset(20)
          .orient(configs.orientation);
      },

      draw() {
        let svg = d3.select(`#${this.field}`);
        let legend_scale = (this.legendType === 'circle') ? this.legendCircle() : this.legendSquare();

        svg.call(legend_scale);
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>

