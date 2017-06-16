<template>
  <div v-show="done" class="col-sm-12 col-lg-12">
    <h3>Snow Levels</h3>
    <legend-chart :colors="colors" :dataValues="dataValues" :field="legend_field"></legend-chart>
    <svg id="snow" :height="graph_height" :width="graph_width">
      <g class="axis x" :transform="graph_translate"></g>
      <g class="axis y" :transform="graph_translate_left"></g>
      <template v-for="(d, index) in snow_data">
        <circle :id="whichType + d.state + index"
                :cx="xYearScale(d.date)" :cy="elevationScale(d.elev)"
                :r="circleSize(d.snow_mean)" :fill="color(d.temp_mean)"
                :transform="graph_translate"
                @mouseover="showItem(d, tipDiv, $event)"
                @mouseout="hideItem(d, tipDiv, $event)"
                @touchstart="showItem(d, tipDiv, $event)"
                @touchend="hideItem(d, tipDiv, $event)">
        </circle>
      </template>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import LegendChart from './LegendChart.vue';
  import {tip} from './utilities/tip';

  export default {
    name: 'SnowChart',

    data() {
        return {
          snow_data: [],
          graph_height: 500 - this.margins().top -this. margins().bottom,
          graph_width: this.fullWidth() + this.margins().left + this.margins().right,
          graph_translate: `translate(${this.margins().left},${this.margins().top})`,
          graph_translate_left: `translate(${this.margins().left - 25},${this.margins().top})`,
          tipDiv: tip,
          colors: ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf',
            '#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'].reverse(),
          circleSize: {},
          color: {},
          xYearScale: {},
          elevationScale: {},
          numFormat: this.numFormatting(),
          whichType: 'snow',
          done: false,
          legend_field: 'temp_mean'
        }
    },

    props: {
      whichState: String,
      dataValues: Array
    },

    computed: {
      dataValues: function () {
        return this.snow_data;
      }
    },

    components: {
      LegendChart: LegendChart
    },

    methods: {
      margins() {
        return {top: 25, right: 40, bottom: 50, left: 75};
      },

      fullWidth() {
        return window.innerWidth;
      },

      colorScale(data) {
        return d3.scaleQuantile()
          .domain(d3.extent(data, (d) => { return d.temp_mean; }))
          .range(this.colors);
      },

      circleRadius(data, sizing) {
        return d3.scaleSqrt()
          .domain(d3.extent(data, (d) => { return d.snow_mean; }))
          .range(sizing);
      },

      timeScale(data, field, size) {
        let scale = d3.scaleTime()
          .range([0, size]);
        scale.domain(d3.extent(data, (d) => { return d[field]; }));

        return scale;
      },

      ordinalScale(data, size) {
        let scale = d3.scaleBand()
          .rangeRound([size, 0])
          .padding(1);

        scale.domain(data);

        return scale;
      },

      showItem(d, tip, event) {
        let text =
          `<h4 class="text-center">${d.date.getFullYear()}</h4>
                   <h5  class="text-center">Snow/Water Equivalence</h5>
                   <ul class="list-unstyled">
                   <li>Elevation: ${this.numFormat(d.elev)}+ feet</li>
                   <li>Temp Mean: ${d.temp_mean} degrees</li>
                   <li>Water Mean: ${d.snow_mean} inches</li>
                   <li>Water Median: ${d.snow_median} inches</li>
                   </ul>`;

        d3.select(event.target).attr('r', this.circleSize(d.snow_mean) * 1.3);
        tip.tipShow(tip.tipDiv(), text, event);
      },

      hideItem(d, tip, event) {
        d3.select(event.target).attr('r', this.circleSize(d.snow_mean));
        tip.tipHide(tip.tipDiv());
      },

      numFormatting() {
          return d3.format(',');
      },

      draw() {
        let margins = this.margins(),
          parse_year = d3.timeParse("%Y"),
          full_width = this.fullWidth,
          type = (full_width <= 500) ? "%y" : "%Y",
          vm = this,
          sizing;

        if (full_width < 500) {
          sizing = [1, 6];
        } else {
          sizing = [2, 20];
        }

        d3.queue()
          .defer(d3.csv, 'static/data/snow/snow_month.csv')
          .await(function(error, datas) {
            let data = datas.filter(function(d) {
              return d.state === vm.whichState;
            });

            data.forEach(function(d) {
              d.date = parse_year(d.year);
              d.snow_mean = +d.snow_mean;
              d.temp_mean = +d.temp_mean;
              d.elev = d.elev + '000';
            });

            let elevations = _.pluck(_.uniq(data, 'elev'), 'elev');

            vm.snow_data = data;
            vm.circleSize = vm.circleRadius(data, sizing);
            vm.color = vm.colorScale(data);
            vm.xYearScale = vm.timeScale(data, 'date', vm.fullWidth() - 50 - margins.left - margins.right);
            vm.elevationScale = vm.ordinalScale(elevations, elevations.length * 45);

            let xYearAxis = d3.axisTop()
              .scale(vm.xYearScale)
              .tickFormat(d3.timeFormat(type));

            let yYearAxis = d3.axisLeft()
              .scale(vm.elevationScale)
              .tickFormat(d3.format(',d'));

            d3.select("#snow g.x").call(xYearAxis);
            d3.select('#snow g.y').call(yYearAxis);

            vm.done = true;
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
