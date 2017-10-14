<template>
  <div id="is-top">
    <div v-if="loading" class="loader" v-bind:class="{'loader-more': loadOffset}">Loading...</div>
    <div class="row" v-show="done">
      <h3 class="map-header" v-bind:class="{'loader-more': loadOffset}" v-show="done" v-if="this.whichState === 'none'">The Water of the West</h3>
      <h3 class="map-header" v-bind:class="{'map-header-lower': loadOffset}" v-show="done" v-else>The Water of the West - {{fullState}}</h3>
      <p class="offset-sm-1 col-sm-10 offset-lg-1 col-lg-10 text-top">
        The western landscape is varied running from desert to rain forest.
        However, most of the region tends towards aridness, requiring concentrated reservoirs and irrigation
        to allow for large scale human settlement. The map and graph below shows the network of reservoirs across
        the west.</p>
        <p class="offset-sm-1 col-sm-10 offset-lg-1 col-lg-10 text-top text-next">
          Much of the American West has been in and out of drought for most of the 21<sup>st</sup> century; leading
        to lower average water levels than would be typical. For an example, check out reservoir levels in California
        in 2015 and most of 2016.
        Click a reservoir to display its levels. Hover over the graph to see the levels for a given month. Data
          updated monthly; so feel free to check back often.</p><!-- For a writeup on how this site was built see
      <a href="" class="inside">Water Data for the West</a>.</p>-->
    <div class="col-sm-12 col-lg-6 map-graph">
      <h3>Reservoirs</h3>
      <p class="center">Percent Full for Month Ending ({{dateListing}}), or Most Recently Available Month</p>
      <p id="map_legend">
        <svg width="450" height="45" transform="translate(70,0)">
          <g>
            <rect x="30" y="15" width="10" height="10" style="fill: rgb(26, 150, 65);"></rect>
            <text x="45" y="25" height="30" width="20">75%+</text>
          </g>
          <g>
            <rect x="100" y="15" width="10" height="10" style="fill: rgb(252, 232, 131);"></rect>
            <text x="115" y="25" height="30" width="20">50%+</text>
          </g>
          <g>
            <rect x="165" y="15" width="10" height="10" style="fill: rgb(215, 25, 28);"></rect>
            <text x="180" y="25" height="30" width="40">Less than 50%</text>
          </g>
        </svg>
      </p>
      <h4 class="text-center upper">Reservoir Capacity (acre feet)</h4>
      <circle-legend-chart
        :dataValues="stations"
        :field="legend_field"
        :whichType="whichType"></circle-legend-chart>
      <svg id="map" class="is-map" :width="width" :height="height" :transform="offset">
        <g>
          <template v-for="(d, index) in stations">
            <circle :id="whichType + d.state + index"
                    :cx="projection([d.lng, d.lat])[0]"
                    :cy="projection([d.lng, d.lat])[1]"
                    :fill="d.color"
                    :r="scale(d.capacity)"
                    @click="newRes(d)"
                    @mouseover="showItem(d, tipDiv, $event)"
                    @mouseout="hideItem(d, tipDiv, $event)"
                    @touchstart="showItem(d, tipDiv, $event)"
                    @touchend="hideItem(d, tipDiv, $event)"></circle>
          </template>
        </g>
      </svg>
    </div>
    <line-chart v-show="done" :whichState="whichState" :reservoirName="reservoirName"
                :selectedData="selectedData" :hasKey="hasKey"></line-chart>
  </div></div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import moment from 'moment';
  import LineChart from './LineChart.vue';
  import CircleLegendChart from './CircleLegendChart.vue';
  import {tip} from './utilities/tip';
  import {reservoirs} from './utilities/stations';
  import {formatting} from './utilities/formatting';
  import {eventing} from './utilities/eventing.js';

  export default {
    name: 'Map',

    data() {
      return {
        loading: true,
        done: false,
        map: [],
        data: [],
        stations: [],
        resValue: this.res,
        fullState: formatting.fullStateName(this.whichState),
        height: this.baseHeight(),
        width: this.baseWidth(),
        loadOffset: window.innerWidth < 1080,
        scale: {},
        projection: {},
        tipDiv: tip,
        whichType: 'map',
        legend_field: 'capacity',
        stateCode: this.whichState,
        offset: this.hasKey || this.whichState === 'TX' ? 'translate(10,0)' : 'translate(35,0)'
      }
    },

    props: {
      dataFile: String,
      mapFile: String,
      res: String,
      resFile: String,
      hasKey: Boolean,
      selectedData: Array,
      reservoirName: String,
      whichState: String
    },

    components: {
      LineChart: LineChart,
      CircleLegendChart: CircleLegendChart
    },

    computed: {
      selectedData: function() {
        return this.data;
      },

      reservoirName: function () {
        return this.resValue;
      },

      dateListing() {
        let current_date = moment().subtract(1, 'month');
        return current_date.format('MMMM YYYY');
      },
    },

    methods: {
      baseHeight() {
        switch(this.whichState) {
          case 'AZ':
          case 'NV':
          case 'ID':
            return 500;
          case 'CA':
            return 600;
          case 'CO':
            return 440;
          case 'MT':
            return 500;
          case 'NM':
            return 550;
          case 'OR':
            return 430;
          case 'TX':
            return 520;
          case 'UT':
            return 600;
          case 'WA':
            return 430;
          case 'WY':
            return 430;
          default:
            return 420;
        }
      },

      baseWidth() {
        let width;

        if(window.innerWidth > 1000 || window.innerWidth < 500) {
          width = (window.innerWidth / 2) - 20;
        } else {
          width = 700;
        }

        return width;
      },

      newRes(d) {
        this.resValue = d.reservoir;

        let selected_file = reservoirs.mapped[this.resValue];

        if(selected_file !== undefined) {
          d3.csv(`static/data/states_all/res/${selected_file}`, (d) => {
            this.data = d;
          });
        }
      },

      showItem(d, tip, event) {
        d3.select(event.target).attr('r', this.scale(d.capacity) * 1.5);
        tip.tipShow(tip.tipDiv(), d.reservoir, event);
      },

      hideItem(d, tip, event) {
        d3.select(event.target).attr('r', this.scale(d.capacity));
        tip.tipHide(tip.tipDiv());
      },

      mapScale(data) {
        return d3.scaleSqrt()
          .domain(d3.extent(data, (d) => { return d.capacity * .2; }))
          .range([3, 13]);
      },

      draw() {
        let vm = this;
        let svg = d3.select('#map g');

        d3.queue()
          .defer(d3.json, `static/data/maps/${this.mapFile}`)
          .defer(d3.json, `static/data/stations_enhanced/${this.resFile}`)
          .defer(d3.csv, `static/data/states_all/${this.dataFile}`)
          .await(function(error, map, stations, data) {
            vm.map = map;
            vm.data = data;

            // Create Map
            let zoom = d3.zoom().scaleExtent([1, 5]).on("zoom", zoomed);
            svg.call(zoom);

            let map_path = formatting.mapScaling(vm.height, vm.width, map, vm.stateCode);
            let path = map_path.path;

            let maps = svg.selectAll('path')
              .data(vm.map.features).call(zoom);

            maps.enter()
              .append('path')
              .merge(maps)
              .attr('vector-effect', 'non-scaling-stroke')
              .attr('d', path);

            maps.exit().remove();

            // Create reservoir circles
            vm.scale = vm.mapScale(stations);
            vm.stations = stations;
            vm.projection = map_path.projection;

            function zoomed() {
              svg.attr("transform", d3.event.transform);
            }

            vm.loading = false;
            vm.done = true;

            // Pass done notice to other components
            eventing.$emit('is-done', true);
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
