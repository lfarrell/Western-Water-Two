<template>
  <div class="col-sm-12 col-lg-12">
    <div v-show="done">
      <h3>Snow Levels</h3>
      <div class="offset-sm-1 col-sm-10 offset-lg-1 col-lg-10 text-top-palmer">
        <p>Snow is vital to the environmental health of the western United States. Unlike rainfall, it doesn't
          come as one burst that's here and then quickly gone. Instead, it tends to accrue over the winter and slowly
          melt as the temperatures rise in the spring. The melt typically continues into the early summer, providing
          a steady, consistent level of water in mountain watersheds. This is particularly important for a
          state like California, which receives almost no summer rainfall.</p>
        <p>Snow comes in a variety of forms. It can be light and airy, almost dry, or it can heavy and dense. For example,
          light, fluffy snow that measures four feet deep might actually have the
          same volume of water as heavier, denser snow that is two feet deep.To account
          for this variation a measure called
          <a class="inside" href="http://www.nrcs.usda.gov/wps/portal/nrcs/detail/or/snow/?cid=nrcs142p2_046155"
             target="_blank">snow water equivalence</a> is used to normalize the amount of liquid water
          in a given level of snow. The graph below uses <a class="inside" href="https://www.wcc.nrcs.usda.gov/snow">SNOTEL</a>
          data; a series of automated weather stations distributed across the west to
          measure things such as snow levels and temperature. Notice how temperature and snow levels change with elevation.
          Compare the average snow/water levels by year and elevation. The general trend is towards drier
          conditions, but wet years are interspersed with drier years.</p>
      </div>
      <h4 class="text-center">Temperature (degrees Fahrenheit)</h4>
    </div>
    <legend-chart :colors="colors"
                  :dataValues="dataValues"
                  :field="legend_temp"></legend-chart>
    <h4 v-show="done" class="text-center">Snow/Water Equivalence (inches)</h4>
    <circle-legend-chart
           :dataValues="dataValues"
           :field="legend_snow"
           :whichType="whichType"></circle-legend-chart>
    <div v-show="done" id="snow_graph">
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
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import LegendChart from './LegendChart.vue';
  import CircleLegendChart from './CircleLegendChart.vue';
  import {tip} from './utilities/tip';
  import {eventing} from './utilities/eventing.js';

  export default {
    name: 'SnowChart',

    data() {
        return {
          snow_data: [],
          graph_height: this.baseHeight() - this.margins().top -this. margins().bottom,
          graph_width: this.fullWidth(),
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
          legend_temp: 'temp_mean',
          legend_snow: 'snow_mean'
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
      LegendChart: LegendChart,
      CircleLegendChart: CircleLegendChart
    },

    methods: {
      margins() {
        return {top: 25, right: 0, bottom: 0, left: 75};
      },

      fullWidth() {
        return window.innerWidth - 50;
      },

      baseHeight() {
        switch(this.whichState) {
          case 'AZ':
            return 220;
          case 'CA':
            return 280;
          case 'CO':
            return 210;
          case 'ID':
            return 350;
          case 'MT':
            return 320;
          case 'NV':
            return 280;
          case 'NM':
            return 200;
          case 'OR':
            return 300;
          case 'UT':
            return 330;
          case 'WA':
            return 270;
          case 'WY':
            return 320;
          default:
            return 520;
        }
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
          `<h4 class="text-center tip">${d.date.getFullYear()}</h4>
                   <h5  class="text-center tip">Snow/Water Equivalence</h5>
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
            elevations.sort(function(a, b) {
                return parseInt(a) - parseInt(b);
            });

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
          });

        eventing.$on('is-done', (done) => {
          vm.done = done;
        });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
