<template>
  <div class="col-sm-12 col-lg-12">
    <svg class="is-map" id="drought_map" :height="graph_height" :width="graph_width"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import {tip} from './utilities/tip';
  import {formatting} from './utilities/formatting';

  export default {
    name: 'DroughtMap',

    data() {
      return {
        graph_height: 500 - this.margins().top -this. margins().bottom,
        graph_width: window.innerWidth - this.margins().left - this.margins().right,
        graph_translate: `translate(${this.margins().left},${this.margins().top})`
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
            let path = map_path.path;
            let maps = svg.selectAll('path')
              .data(map.features);

            maps.enter()
              .append('path')
              .merge(maps)
              .attr('vector-effect', 'non-scaling-stroke')
              .attr('d', path);

            maps.exit().remove();
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
