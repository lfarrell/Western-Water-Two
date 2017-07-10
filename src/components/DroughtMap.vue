<template>
  <div class="col-sm-12 col-lg-12 offset">
    <h3 class="text-center" style="margin-bottom: 40px">Drought Levels</h3>
    <vue-slider ref="slider"
                @callback="updateSlider"
                v-bind="slider_data"
                v-model="slider_data.value"></vue-slider>
    <svg class="is-map" id="drought_map" :height="graph_height" :width="graph_width">
      <template v-for="(d, index) in centers">
          <circle v-for="j in num_circles"
                  :id="d.county + index + j"
                  :cx="projection([d.lon, d.lat])[0]"
                  :cy="projection([d.lon, d.lat])[1]"
                  :style="{stroke:colors[j]}"
                  :r="findValue(d, filtered_data, j)"></circle>
      </template>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import vueSlider from 'vue-slider-component';
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
        none: '',
        slider_data: {
          value: '06/2017',
          width: '80%',
          reverse: true,
          formatter: function(value) {
            let formatting = d3.timeFormat('%b, %Y');
            let create_date = d3.timeParse("%m/%Y");
            return formatting(create_date(value));
          },
          style: {
            marginLeft: '10%'
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
      vueSlider
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

      whichState(values, d) {
        let field = (d.county !== undefined) ? 'county' : 'state';
        return _.find(values, function(e) {
          return d[field] === e[field];
        });
      },

      findValue(d, values, iteration) {
        let state = this.whichState(values, d);
        return state[`D${iteration}`] * .1;
      },

      note(values, selector) {
        let vm = this;
        let state_list = {
          AZ: 'Arizona',
          CA: 'California',
          CO: 'Colorado',
          ID: 'Idaho',
          MT: 'Montana',
          NV: 'Nevada',
          NM: 'New Mexico',
          OR: 'Oregon',
          TX: 'Texas',
          UT: 'Utah',
          WA: 'Washington',
          WY: 'Wyoming'
        };

        function formatted(value) {
          return  (value === 100.0) ? 100 : value;
        }

        selector.on('mouseover touchstart', function(d) {
          let state = vm.whichState(values, d);

          div.transition()
            .duration(100)
            .style("opacity", .9);

          div.html(
            `<h4 class="text-center"> ${state_list[state.state]}</h4>
            <h5  class="text-center">Drought Levels (% of state)</h5>
            <div class="row">
              <div class="col-md-6">
                <ul class="list-unstyled first">
                  <li>D0: ${formatted(state['D0'])}%</li>
                  <li>D1: ${formatted(state['D1'])}%</li>
                  <li>D2: ${formatted(state['D2'])}%</li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="list-unstyled last">
                  <li>D3: ${formatted(state['D3'])}%</li>
                  <li>D4: ${formatted(state['D4'])}%</li>
                </ul>
              </div>
            </div>`
          )
            .style("top", (d3.event.pageY+18)+"px")
            .style("left", (d3.event.pageX-15)+"px");
        })
        .on('mouseout touchend', function(d) {
          div.transition()
            .duration(250)
            .style("opacity", 0);
        });
      },

      draw() {
        let vm = this;
        let tip_div = tip.tipDiv();

        let svg = d3.select('#drought_map');

        d3.queue()
          .defer(d3.json, `static/data/maps/${this.mapFile}`)
          .defer(d3.json, `static/data/drought/centers/${this.centersFile}`)
          .defer(d3.csv, `static/data/drought/${this.dataFile}`)
          .await(function(error, map, centers, data) {
            data.forEach((d) => {
              d.full_date = `${d.month}/${d.year}`;
            });

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

            //  let selected = d3.selectAll(`circle.level_${i}`);
            //  note(center_vals, selected);
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
