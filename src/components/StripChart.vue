<template>
  <div class="col-sm-12 col-lg-12">
    <svg id="strip" height="110" width="1000"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';

  const margins = { top: 20, right: 50, left: 100, bottom: 75 },
        height = 400 - margins.top - margins.bottom;

  export default {
    name: 'StripChart',

    data() {
      return {
        data: [],
        width: window.innerWidth - margins.left - margins.right
      }
    },

    props: {
      stateFile: String
    },

    methods: {
      xScale(data, width) {
        return d3.scaleTime()
          .domain(d3.extent(data, (d) => { return d.date; }))
          .range([0, width]);
      },

      stripColors(data) {
        let precip_colors = ['#543005','#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5',
          '#c7eae5','#80cdc1','#35978f','#01665e','#003c30'];
        return d3.scaleQuantize()
          .domain(d3.extent(data, (d) => { return d.anomaly; }))
          .range(precip_colors);
      },

      draw() {
        let vm = this;

        d3.csv(`static/data/palmer/${this.stateFile}`, function(datas) {
          let bar_width = _.floor((vm.width / datas.length), 3);
          let parse_date = d3.timeParse('%m/%Y');

          datas.forEach((d) => {
            d.date = parse_date(`${d.month}/${d.year}`)
          });

          vm.data = _.sortByOrder(datas, ['year', 'month']);
          let xScale = vm.xScale(vm.data, vm.width);
          let strip_color = vm.stripColors(vm.data);

          let add = d3.select('#strip').selectAll('bar')
            .data(vm.data);

          add.enter().append('rect')
            .merge(add)
            .attr('x', function (d) {
              return xScale(d.date);
            })
            .attr('width', bar_width)
            .attr('y', 0)
            .attr('height', 80)
            .attr('transform', `translate(${margins.left},0)`)
            .style('fill', (d) => { return strip_color(d.anomaly); })
            .on('mouseover touchstart', function (d) {
              d3.select(this).attr('height', 100);
              tip.show.call(this, d);
            })
            .on('mouseout touchend', function (d) {
              d3.select(this).attr('height', 80);
              tip.hide.call(this, d);
            });
        });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
