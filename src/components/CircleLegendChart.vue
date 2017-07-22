<template>
  <svg :width="width" :height="height" :transform="translate">
    <g :id="field" :width="width" transform="translate(20,15)"></g>
  </svg>
</template>

<script>
  import * as d3 from 'd3';
  import legend from 'd3-svg-legend'

  export default {
    name: 'CircleLegendChart',

    data() {
      return {
        width: '',
        height: '',
        translate: ''
      }
    },

    props: {
      dataValues: Array,
      field: String,
      whichType: String
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
        let orientation;

        if(screen_width < 1000) {
          orientation = 'vertical';
          this.height = 210;
          this.width = 100;
          this.translate = 'translate(0,0)';
        } else {
          orientation = 'horizontal';
          this.height = 70;
          this.width = 500;
          this.translate = (this.whichType === 'map') ? `translate(${(this.width - 215)  / 2},0)` :
            `translate(${(screen_width - 320) / 2},0)`;
        }

        return {orientation: orientation};
      },

      chartType() {
          let format, spacing;
          if(this.whichType === 'map') {
              format = ',';
              spacing = 50;
          } else {
              format = '.01f';
              spacing = 30;
          }

          return {format: format, spacing: spacing};
      },

      legendCircle() {
        let legend_scales = d3.scaleSqrt()
          .domain(d3.extent(this.dataValues, (d) => { return +d[this.field]; }))
          .range(this.circleSizing());
        let configs = this.legendOrientation();
        let chart_format = this.chartType();

        return legend.legendSize()
          .scale(legend_scales)
          .shape('circle')
          .shapePadding(chart_format.spacing)
          .labelOffset(20)
          .labelFormat(d3.format(chart_format.format))
          .orient(configs.orientation);
      },

      draw() {
        let svg = d3.select(`#${this.field}`);
        let legend_scale = this.legendCircle();

        svg.call(legend_scale);
      }
    }
  }
</script>
