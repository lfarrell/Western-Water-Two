<template>
  <div id="is-top">
    <div v-if="loading" class="loader">Loading...</div>
    <div class="row">
    <div v-show="done" class="col-sm-12 col-lg-6 map-graph">
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
            <text x="180" y="25" height="30" width="40">Less than 50% </text>
          </g>
        </svg>
      </p>
      <h4 class="text-center upper">Reservoir Capacity (acre feet)</h4>
      <circle-legend-chart
        :dataValues="stations"
        :field="legend_field"
        :whichType="whichType"></circle-legend-chart>
      <svg id="map" class="is-map" width="600" height="500">
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
  import {dataloader} from './utilities/dataloader';

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
        scale: {},
        projection: {},
        tipDiv: tip,
        whichType: 'map',
        legend_field: 'capacity'
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
        let vm = this;
        return this.data.filter((d) => {
          return vm.resName(d) === this.resValue;
        });
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
      newRes(d) {
        this.resValue = d.reservoir;
      },

      showItem(d, tip, event) {
        d3.select(event.target).attr('r', this.scale(d.capacity) * 1.5);
        tip.tipShow(tip.tipDiv(), d.reservoir, event);
      },

      hideItem(d, tip, event) {
        d3.select(event.target).attr('r', this.scale(d.capacity));
        tip.tipHide(tip.tipDiv());
      },

      resColors(d) {
        if (d >= 75) {
          return '#1a9641';
        } else if (d >= 50) {
          return '#FCE883';
        } else if (d < 50) {
          return '#d7191c';
        } else {
          return 'lightgray';
        }
      },

      resName(d) {
          return this.hasKey ? reservoirs.reservoir_names[d.reservoir] : d.reservoir;
      },

      mapScale(data) {
        return d3.scaleSqrt()
          .domain(d3.extent(data, (d) => { return d.capacity * .2; }))
          .range([3, 13]);
      },

      mapPctFull(data, stations, reservoir_names, key_used) {
        let sorted = d3.nest()
          .key(function(d) {
            return (!key_used) ? d.reservoir : reservoir_names[d.reservoir];
          })
          .map(data);

        stations.forEach(function(d) {
          let res_total = _.last(sorted[`$${d.reservoir}`]);
          d.pct_capacity = (res_total !== undefined) ? res_total.pct_capacity : undefined;
          d.capacity = (res_total !== undefined) ? res_total.capacity : undefined;
        });

        stations.sort(function(a,b) {
          let a_cap = +a.capacity;
          let b_cap = +b.capacity;
          if(b_cap < a_cap) {
            return -1;
          } else if(b_cap > a_cap) {
            return 1;
          } else {
            return 0;
          }
        });

        return stations;
      },

      draw() {
        let vm = this;

        let svg = d3.select('#map');
        let width = svg.attr('width');
        let height = svg.attr('height');
        let reservoir_names = reservoirs.reservoir_names;

       // console.log(dataloader.load(`static/data/states_all/${vm.resFile}`))

        d3.queue()
          .defer(d3.json, `static/data/maps/${this.mapFile}`)
          .defer(d3.csv, `static/data/stations/${this.dataFile}`)
          .defer(d3.csv, `static/data/states_all/${this.resFile}`)
          .await(function(error, map, stations, data) {
            vm.map = map;
            vm.data = data;

            // Create Map
            let zoom = d3.zoom().scaleExtent([1, 5]).on("zoom", zoomed);
            svg.call(zoom);

            let map_path = formatting.mapScaling(height, width, map);
            let path = map_path.path;

            let maps = svg.selectAll('path')
              .data(map.features).call(zoom);

            maps.enter()
              .append('path')
              .merge(maps)
              .attr('vector-effect', 'non-scaling-stroke')
              .attr('d', path);

            maps.exit().remove();

            // Create reservoir circles
            stations = vm.mapPctFull(data, stations, reservoir_names,vm.hasKey);
            stations.forEach((d) => {
                d.color = vm.resColors(d.pct_capacity);
            });

            vm.scale = vm.mapScale(data);
            vm.stations = stations;
            vm.projection = map_path.projection;

            function zoomed() {
              svg.attr("transform", d3.event.transform);
            }

            vm.loading = false;
            vm.done = true;
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
