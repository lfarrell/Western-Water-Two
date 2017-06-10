<template>
  <svg></svg>
</template>

<script>
  import * as d3 from 'd3';
  import {tip} from './utilities/tip';

  export default {
    name: 'DroughtMap',

    data() {
      return {
        graph_height: 500 - this.margins().top -this. margins().bottom,
        graph_width: 600 - this.margins().left - this.margins().right,
        graph_translate: `translate(${this.margins().left},${this.margins().top})`
      }
    },

    props: {
      dataFile: String,
      mapFile: String
    },

    methods: {
      draw() {
        let vm = this;
        let tip_div = tip.tipDiv();

        let svg = d3.select('#map');
        let width = svg.attr('width');
        let height = svg.attr('height');

        let scale = 1,
          projection = d3.geoAlbers()
            .scale(scale)
            .translate([0,0]);

        d3.queue()
          .defer(d3.json, `static/data/maps/${this.mapFile}`)
         // .defer(d3.csv, `static/data/drought/${this.dataFile}`)
          .await(function(error, map, stations, data) {
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
          });
      }
    }
  }
</script>
