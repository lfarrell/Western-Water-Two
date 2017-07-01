<template>
  <div class="col-sm-12 col-lg-12">
    <svg class="is-map" id="drought_map" :height="graph_height" :width="graph_width"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import {tip} from './utilities/tip';
  import {formatting} from './utilities/formatting';

  export default {
    name: 'DroughtMap',

    data() {
      return {
        graph_height: 500 - this.margins().top -this. margins().bottom,
        graph_width: window.innerWidth - this.margins().left - this.margins().right,
        graph_translate: `translate(${this.margins().left},${this.margins().top})`,
        colors: ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404']
      }
    },

    props: {
      mapFile: String,
      centersFile: String,
      dataFile: String
    },

    methods: {
      margins() {
        return {top: 25, right: 40, bottom: 0, left: 75};
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
            let map_path = formatting.mapScaling(vm.graph_height, vm.graph_width, map);
            let projection = map_path.projection;
            let path = map_path.path;
            let maps = svg.selectAll('path')
              .data(map.features);

            maps.enter()
              .append('path')
              .merge(maps)
              .attr('vector-effect', 'non-scaling-stroke')
              .attr('d', path);

            maps.exit().remove();

            let center_vals = data.filter(function(d) {
              return d.year == "2014" && d.month == "10";
            });

            let circles = svg.selectAll('circle')
              .data(centers);

            for(let i=0; i<5; i++) {
              circles.enter().append('circle')
                .merge(circles)
                .attr('class', `level_${i}`)
                .attr('cx', function(d) {
                  return projection([d.lon, d.lat])[0];
                }).attr('cy', function(d) {
                  return projection([d.lon, d.lat])[1];
                }).attr('r', function(d) {
                  return vm.findValue(d, center_vals, i);
                }).style('stroke', vm.colors[i])
                .style('fill', 'none');

            //  let selected = d3.selectAll(`circle.level_${i}`);
            //  note(center_vals, selected);
            }
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
