<template>
  <div>
    <div v-if="loading" class="loader">Loading...</div>
    <div v-show="done" class="col-sm-12 col-lg-7 map-graph">
      <h3>Reservoirs</h3>
      <p class="center">Percent Full for Month Ending ({{dateListing}}), or Most Recently Available Month</p>
      <svg id="map" width="620" height="500" vector-effect="non-scaling-stroke">
       <!-- <g v-for="d in data">
          <circle :x="" :y="" :fill="" :r="mapScale(d.)"></circle>
        </g> -->
      </svg>
    </div>
    <line-chart v-show="done" :whichState="whichState" :reservoirName="reservoirName"
                :selectedData="selectedData" :hasKey="hasKey"></line-chart>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import moment from 'moment';
  import LineChart from './LineChart.vue';
  import {tip} from './utilities/tip';
  import {reservoirs} from './utilities/stations';

  export default {
    name: 'Map',

    data() {
      return {
        loading: true,
        done: false,
        map: [],
        data: [],
        stations: [],
        resValue: this.res
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
      LineChart: LineChart
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
          .range([2, 12]);
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
        let tip_div = tip.tipDiv();

        let svg = d3.select('#map');
        let width = svg.attr('width');
        let height = svg.attr('height');
        let reservoir_names = reservoirs.reservoir_names;

        /* Draw the map */
        let scale = 1,
          projection = d3.geoAlbers()
            .scale(scale)
            .translate([0,0]);

        d3.queue()
          .defer(d3.json, `static/data/maps/${this.mapFile}`)
          .defer(d3.csv, `static/data/stations/${this.dataFile}`)
          .defer(d3.csv, `static/data/states_all/${this.resFile}`)
          .await(function(error, map, stations, data) {
            vm.map = map;
            vm.stations = stations;
            vm.data = data;
            // Create Map
            let zoom = d3.zoom().scaleExtent([1, 5]).on("zoom", zoomed);
            svg.call(zoom);

            let path = d3.geoPath().projection(projection);
            let bounds = path.bounds(map);
            scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);

            let state = vm.whichState;

            let translation = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
              (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

            // update projection
            projection = d3.geoAlbersUsa()
              .scale(scale)
              .translate(translation);
            path = path.projection(projection);



            let maps = svg.selectAll('path')
              .data(map.features).call(zoom);

            maps.enter()
              .append('path')
              .merge(maps)
              .attr('d', path);

            maps.exit().remove();

            // Create reservoir circles
            stations = vm.mapPctFull(data, stations, reservoir_names,vm.hasKey);
            let mapScale = vm.mapScale(data);

            let station = svg.selectAll('circle')
              .data(stations);

            station.enter()
              .append('circle')
              .merge(station)
              .attr('cx', (d) => {
                return projection([d.lng, d.lat])[0];
              })
              .attr('cy', (d) => {
                return projection([d.lng, d.lat])[1];
              })
              .attr('r', (d) => {
                return mapScale(d.capacity);
              })
              .style('fill', (d) => {
                return vm.resColors(d.pct_capacity);
              })
              .on('click', function (res) {
                vm.resValue = res.reservoir;
              })
              .on('mouseover', function(d) {
                tip.tipShow(tip_div, d.reservoir);

                d3.select(this).attr('r', function(d) {
                  return mapScale(d.capacity) * 1.5;
                });
              })
              .on('mouseout', function(d) {
                tip.tipHide(tip_div);

                d3.select(this).attr('r', function(d) {
                  return mapScale(d.capacity);
                });
              });

            station.exit().remove();

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

<style scoped>
  #map path {
    fill: white;
    stroke: white;
    stroke-width: 1.5;
    fill-opacity: 0.2;
    stroke-opacity: 0.3;
  }
</style>
