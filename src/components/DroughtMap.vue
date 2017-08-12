<template>
  <div class="col-sm-12 col-lg-12 offset">
    <div v-if="done">
      <h3 class="text-center">Drought Levels by {{droughtType}}</h3>
      <p class="offset-sm-1 col-sm-10 offset-lg-1 col-lg-10 text-top-drought">
        The following chart shows drought level by {{droughtTypeLower}}. Drought levels are show by a series of nested
        circles. The larger the circle the greater percentage of the {{droughtTypeLower}} that is at that drought level.
      In extreme cases, e.g. 100% drought levels, the circles will overlap. If there is no drought in a {{droughtTypeLower}}
      there won't be any circles at all. Hover over a circle to see the levels for a
      particular {{droughtTypeLower}}. See the legends below the map for full details.</p>
      <vue-slider ref="slider"
                  @callback="updateSlider"
                  v-bind="slider_data"
                  v-model="slider_data.value"></vue-slider>
    </div>
    <div v-show="done">
      <svg class="is-map" id="drought_map" :height="graph_height" :width="graph_width">
        <template v-for="(d, index) in centers">
          <g @mouseover="showItem(d, tipDiv, $event)"
             @mouseout="hideItem(d, tipDiv, $event)"
             @touchstart="showItem(d, tipDiv, $event)"
             @touchend="hideItem(d, tipDiv, $event)">
            <circle v-for="j in num_circles"
                    :cx="projection([d.lon, d.lat])[0]"
                    :cy="projection([d.lon, d.lat])[1]"
                    :style="{stroke:colors[j]}"
                    :r="findValue(d, filtered_data, j)"></circle>
          </g>
        </template>
      </svg>
      <drought-legend-chart :colors="colors"></drought-legend-chart>
      <div class="offset-sm-1 col-sm-10">
        <p>If you have any questions or comments feel free to contact me via Twitter at @farrelldlfarrel, or email
          at farrelldlfarrell at gmail.com</p>
      </div>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import vueSlider from 'vue-slider-component';
  import DroughtLegendChart from './DroughtLegendChart.vue';
  import {tip} from './utilities/tip';
  import {formatting} from './utilities/formatting';

  export default {
    name: 'DroughtMap',

    data() {
      return {
        graph_height: 500 - this.margins().top -this. margins().bottom,
        graph_width: window.innerWidth - this.margins().left - this.margins().right,
        graph_translate: `translate(${this.margins().left},${this.margins().top})`,
        colors: ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404'],
        num_circles: _.range(0, 5),
        drought_data: [],
        filtered_data: [],
        centers: [],
        projection: {},
        tipDiv: tip,
        none: '',
        done: false,
        droughtType: '',
        droughtTypeLower: '',
        slider_data: {
          value: '07/2017',
          width: '80%',
          reverse: true,
          formatter: function(value) {
            let formatting = d3.timeFormat('%b, %Y');
            let create_date = d3.timeParse("%m/%Y");
            return formatting(create_date(value));
          },
          style: {
            marginLeft: '10%',
            marginBottom: '1%'
          },
          data: []
        }
      }
    },

    props: {
      mapFile: String,
      centersFile: String,
      dataFile: String
    },

    components: {
      vueSlider,
      DroughtLegendChart: DroughtLegendChart
    },

    methods: {
      margins() {
        return {top: 25, right: 40, bottom: 0, left: 75};
      },

      updateSlider(val) {
        this.filtered_data = this.filteredData(val);
      },

      filteredData(test_value) {
        return this.drought_data.filter(function(d) {
          return d.full_date === test_value;
        });
      },

      whichType(d) {
        return (d.county !== undefined) ? 'county' : 'state';
      },

      whichState(values, d) {
        let field = this.whichType(d);

        return _.find(values, function(e) {
          return d[field] === e[field];
        });
      },

      findValue(d, values, iteration) {
        let state = this.whichState(values, d);
        return state[`D${iteration}`] * .1;
      },

      formatted(value) {
        return (value === 100.0) ? 100 : value;
      },

      showItem(d, tip, event) {
        let state = this.whichState(this.filtered_data, d);
        let header_field = this.whichType(d);
        let text_formatted;

        if(header_field === 'county') {
            text_formatted = `${d[header_field]} County`;
        } else {
            text_formatted = formatting.fullStateName(d[header_field]);
        }

        let text = `
          <h4 class="text-center tip">${text_formatted}</h4>
          <h5 class="text-center tip">${formatting.stringDate(state.month, true)}, ${state.year}</h5>
           <h5  class="text-center tip">Drought Levels (% of ${_.capitalize(header_field)})</h5>
           <div class="row">
             <div class="col-md-6">
               <ul class="list-unstyled first">
                 <li>D0: ${this.formatted(state['D0'])}%</li>
                 <li>D1: ${this.formatted(state['D1'])}%</li>
                 <li>D2: ${this.formatted(state['D2'])}%</li>
               </ul>
              </div>
              <div class="col-md-6">
                <ul class="list-unstyled last">
                  <li>D3: ${this.formatted(state['D3'])}%</li>
                  <li>D4: ${this.formatted(state['D4'])}%</li>
                </ul>
              </div>
            </div>`;

        tip.tipShow(tip.tipDiv(), text, event);
      },

      hideItem(d, tip, event) {
        tip.tipHide(tip.tipDiv());
      },

      draw() {
        let vm = this;
        let svg = d3.select('#drought_map');

        d3.queue()
          .defer(d3.json, `static/data/maps/${this.mapFile}`)
          .defer(d3.json, `static/data/drought/centers/${this.centersFile}`)
          .defer(d3.csv, `static/data/drought/${this.dataFile}`)
          .await(function(error, map, centers, data) {
            data.forEach((d) => {
              d.full_date = `${d.month}/${d.year}`;
            });

            vm.droughtTypeLower = vm.whichType(data[0]);
            vm.droughtType = _.capitalize(vm.whichType(data[0]));
            vm.drought_data = data;
            vm.slider_data.data = _.pluck(_.uniq(vm.drought_data, 'full_date'), 'full_date').reverse();

            let test_value = _.last(vm.drought_data).full_date;
            vm.filtered_data = vm.filteredData(test_value);
            vm.centers = centers;

            let map_path = formatting.mapScaling(vm.graph_height, vm.graph_width, map);
            vm.projection = map_path.projection;

            let path = map_path.path;
            let maps = svg.selectAll('path')
              .data(map.features);

            maps.enter()
              .append('path')
              .merge(maps)
              .attr('vector-effect', 'non-scaling-stroke')
              .attr('d', path);

            maps.exit().remove();
            vm.done = true;
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
