<template>
  <div class="col-sm-12 col-lg-5" id="graph">
    <h3>Reservoir: <span id="reservoir">Shasta, CA</span></h3>
    <p class="center">21st Century Average Volume: <span id="all_res_avg"></span> acre feet</p>
    <svg id="line-chart"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import {tip} from './utilities/tip';

  export default {
    name: 'LineChart',

    props: {
      selectedData: Array
    },

    watch: {
      selectedData: function(val) {
        this.selectedData = val;
        this.draw();
      }
    },

    methods: {
      histAvg(data) {
        if(data[0].mean === undefined) {
          let avg = d3.mean(data, function(d) {
            if(d.storage !== undefined) {
              return +d.storage;
            } else {
              return +d.value;
            }
          });

          data.forEach(function(d) {
            d.mean = avg;
          });
        }

        return data;
      },

      draw() {
        let data = this.histAvg(this.selectedData),
          num_format = d3.format(",.1"),
          short_format = d3.timeParse('%m/%y'),
          long_format = d3.timeParse('%m/%Y'),
          format = this.hasKey ? short_format : long_format,
          margin = {top: 20, right: 130, left: 100, bottom: 80},
          graph_width = 600 - margin.left - margin.right,
          graph_height = 500 - margin.top - margin.bottom;

        let tip_div = tip.tipDiv();

        let xScale = d3.scaleTime().range([0, graph_width]);

        xScale.domain(d3.extent(data, function(d) { return format(d.date); }));

        let yScale = d3.scaleLinear()
          .domain([d3.max(data, function(d) { return d.capacity; }) * 1.2, 0])
          .range([0, graph_height]);

        let bisectDate = d3.bisector(function(d) { return format(d.date); }).right;

          // Create Axis
        let xAxis = d3.axisBottom()
          .scale(xScale);

        let yAxis = d3.axisLeft()
          .scale(yScale);

        d3.select('#all_res_avg').text(_.round(data[0].mean, 1));

        let storage = d3.line()
          .curve(d3.curveNatural)
          .x(function(d) { return xScale(format(d.date)); })
          .y(function(d) { return yScale(d.storage); });

        let avg_storage = d3.line()
          .curve(d3.curveNatural)
          .x(function(d) { return xScale(format(d.date)); })
          .y(function(d) { return yScale(d.mean); });

        let capacity = d3.line()
          .curve(d3.curveNatural)
          .x(function(d) { return xScale(format(d.date)); })
          .y(function(d) { return yScale(d.capacity); });

        let chart = d3.select('#line-chart')
          .attr('width', graph_width + margin.left + margin.right)
          .attr('height', graph_height + margin.top + margin.bottom);

        chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate('+ margin.left + ',' + (graph_height + margin.top) + ')')
          .call(xAxis);

        chart.append('text')
          .attr('x', graph_width / 1.5)
          .attr('y', graph_height + margin.bottom)
          .style('text-anchor', 'zs')
          .text('Date');

        chart.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
          .call(yAxis);

        chart.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -graph_height/2)
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Acre Feet');

        chart.append('path')
          .attr('d', storage(data))
          .attr('id', 'storage')
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 2)
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        chart.append('g')
          .append('path')
          .attr('d', avg_storage(data))
          .attr('id', 'avg_storage')
          .attr('fill', 'none')
          .attr('stroke', '#FCE883')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', [5,5])
          .attr('transform', 'translate(' + margin.left + ',' + margin.top +')');

        chart.append('g')
          .append('path')
          .attr('d', capacity(data))
          .attr('id', 'capacity')
          .attr('fill', 'none')
          .attr('stroke', 'green')
          .attr('stroke-width', 2)
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

     /*   function mousemove() {
          let x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i];

          if(d1 === undefined) d1 = Infinity;
          let d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          let transform_values = [(xScale(format(d.date)) + margin.left), margin.top];
          d3.select("#graph line.y0").translate(transform_values);

          let date_bits = d.date.split('/');
          let message = `<h4 class="text-center">${chartService.stringDate(date_bits[0])}, 20${date_bits[1]}</h4>
          <ul class="list-unstyled">
          <li>Capacity: ${d.capacity} acre ft</li>
          <li>Vol: ${d.storage} acre ft</li>
          <li>Pct Full: ${d.pct_capacity}%</li>
          <li>Pct of Hist. Avg: ${(d.storage / d.mean * 100).toFixed(1)}%</li>
          </ul>`;

          tip.tipShow(tip, message); */
        }
      }
    },

    updated() {
      this.draw();
    },

   /* mounted() {
      this.draw();
    } */
  }
</script>

<style scoped>

</style>
