<template>
  <div v-bind:class="{'circle-legend': centerClass}">
    <svg :width="width" :height="height" :transform="translate">
      <g :id="field" :width="width" transform="translate(20,15)"></g>
    </svg>
  </div>
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
        translate: '',
        centerClass: false
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
          this.height = 250;
          this.width = window.innerWidth;
          this.translate = 'translate(0,0)';
        } else {
          orientation = 'horizontal';

          if(this.whichType === 'map') {
            this.width = 500;
            this.centerClass = true;
            this.height = 120;
            this.translate = 'translate(0,0)';
          } else {
            this.width = window.innerWidth;
            this.height = 70;
            this.translate = `translate(${(screen_width - 380) / 2},0)`;
          }
        }

        return {orientation: orientation};
      },

      chartType() {
          let format, spacing;
          if(this.whichType === 'map') {
            format = ',';
            if(window.innerWidth < 1000) {
              spacing = 25;
            } else {
              spacing = 50;
            }
          } else {
              format = '.01f';
            if(window.innerWidth < 1000) {
              spacing = 25;
            } else {
              spacing = 50;
            };
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
