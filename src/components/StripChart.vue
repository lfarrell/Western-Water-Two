<template>
  <div class="col-sm-12 col-lg-12">
    <svg id="strip" height="110" width="1000"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import {tip} from './utilities/tip';

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

      stringDate(month) {
        let month_names = ["January", "February", "March",
          "April", "May", "June",
          "July", "August", "September",
          "October", "November", "December"];

        let month_num = parseInt(month, 10) - 1;

        return month_names[month_num];
      },

      avgValues(data) {
        let months = d3.range(1, 13);
        let avgs = {
          drought: []
        };
        let field_value, avg;

        months.forEach(function(month) {
          let month_format = (month < 10) ? '0' + month : '' + month;
          field_value = _.findWhere(data, { month: month_format });
          avg = field_value.value - field_value.anomaly;
          avgs['drought'].push({ key: month_format, value: avg });
        });

        return avgs;
      },

      monthAvg(avgs, field, month) {
        return avgs[field][parseInt(month,10) - 1].value.toFixed(2);
      },

      draw() {
        let vm = this;
        let tip_div = tip.tipDiv();

        d3.csv(`static/data/palmer/${this.stateFile}`, function(datas) {
          let bar_width = _.floor((vm.width / datas.length), 3);
          let parse_date = d3.timeParse('%m/%Y');

          datas.forEach((d) => {
            d.date = parse_date(`${d.month}/${d.year}`)
          });

          vm.data = _.sortByOrder(datas, ['year', 'month']);
          let xScale = vm.xScale(vm.data, vm.width);
          let strip_color = vm.stripColors(vm.data);
          let avgs = vm.avgValues(vm.data);

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

              let template = `
                <h4 class="text-center">${vm.stringDate(d.month)}, ${d.year}</h4>
                <ul class="list-unstyled"
                  <li>Historical Avg: ${vm.monthAvg(avgs, 'drought', d.month)}</li>
                  <li>Actual Avg: ${d.value}</li>
                  <li>Departure from Avg: ${d.anomaly}</li>
                </ul>`;

              tip.tipShow(tip_div, template);
            })
            .on('mouseout touchend', function (d) {
              d3.select(this).attr('height', 80);
              tip.tipHide(tip_div);
            });
        });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
