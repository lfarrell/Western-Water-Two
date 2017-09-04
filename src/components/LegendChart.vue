<template>
  <svg :width="width" :height="height" :transform="translate">
    <g :id="field" :width="width"></g>
  </svg>
</template>

<script>
  import * as d3 from 'd3';
  import legend from 'd3-svg-legend';
  import {eventing} from './utilities/eventing.js';

  export default {
    name: 'LegendChart',

    data() {
      return {
        width: '',
        height: '',
        translate: '',
        done: false
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
      legendOrientation() {
        let screen_width = window.innerWidth;
        let size, orientation;

        if(screen_width < 1100) {
          size = 40;
          orientation = 'vertical';
          this.height = 210;
          this.width = 200;
          this.translate = 'translate(0,0)';
        } else {
          size = 80;
          orientation = 'horizontal';
          this.height = 90;
          this.width = 1100;
          this.translate = `translate(${(screen_width - 930) / 2},20)`;
        }

        return {size: size, orientation: orientation};
      },

      legendSquare() {
        let field_name = this.field.split('-')[0];
        let legend_scales = d3.scaleQuantile()
          .domain(d3.extent(this.dataValues, (d) => { return +d[field_name]; }))
          .range(this.colors);
        let configs = this.legendOrientation();

        return legend.legendColor()
          .shapeWidth(configs.size)
          .orient(configs.orientation)
          .labelFormat(d3.format('.01f'))
          .scale(legend_scales);
      },

      draw() {
        let svg = d3.select(`#${this.field}`);
        let legend_scale = this.legendSquare();

        setTimeout(function() {
          svg.call(legend_scale);
        }, 500);
      }
    }
  }
</script>

