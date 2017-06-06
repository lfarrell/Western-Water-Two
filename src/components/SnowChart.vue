<template>
  <div class="col-sm-12 col-lg-12">
    <h3>Snow Levels</h3>
    <svg id="snow" :height="graph_height" :width="graph_width"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import {tip} from './utilities/tip';

  export default {
    name: 'SnowChart',

    data() {
        return {
          state_list: {
            AZ: 'Arizona',
            CA: 'California',
            CO: 'Colorado',
            ID: 'Idaho',
            MT: 'Montana',
            NV: 'Nevada',
            NM: 'New Mexico',
            OR: 'Oregon',
            UT: 'Utah',
            WA: 'Washington',
            WY: 'Wyoming'
          },
          graph_height: 500 - this.margins().top -this. margins().bottom,
          graph_width: this.fullWidth() + this.margins().left + this.margins().right,
        }
    },

    props: {
       whichState: String
    },

    methods: {
      margins() {
        return {top: 25, right: 40, bottom: 50, left: 75};
      },

      fullWidth() {
        return window.innerWidth;
      },

      stateList() {
        return {
          AZ: 'Arizona',
          CA: 'California',
          CO: 'Colorado',
          ID: 'Idaho',
          MT: 'Montana',
          NV: 'Nevada',
          NM: 'New Mexico',
          OR: 'Oregon',
          UT: 'Utah',
          WA: 'Washington',
          WY: 'Wyoming'
        }
      },

      colorScale(data) {
        let temp_colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf',
          '#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'].reverse();

        return d3.scaleQuantile()
          .domain(d3.extent(data, (d) => { return d.temp_mean; }))
          .range(temp_colors);
      },

      circleRadius(data, sizing) {
        return d3.scaleSqrt()
          .domain(d3.extent(data, (d) => { return d.snow_mean; }))
          .range(sizing);
      },

      timeScale(data, field, size) {
        let scale = d3.scaleTime()
          .range([0, size]);
        scale.domain(d3.extent(data, (d) => { return d[field]; }));

        return scale;
      },

      ordinalScale(data, size) {
        let scale = d3.scaleBand()
          .rangeRound([size, 0])
          .padding(1);

        scale.domain(data);

        return scale;
      },

      draw() {
        let margins = this.margins(),
          parse_year = d3.timeParse("%Y"),
          full_width = this.fullWidth,
          type = (full_width <= 500) ? "%y" : "%Y",
          num_format = d3.format(','),
          vm = this;

        let sizing;

        if (full_width < 500) {
          sizing = [1, 6];
        } else {
          sizing = [2, 20];
        }

        let svg_year = d3.select('#snow');
        let tip_div = tip.tipDiv();

        d3.queue()
          .defer(d3.csv, 'static/data/snow/snow_month.csv')
          .await(function(error, datas) {
            let data = datas.filter(function(d) {
              return d.state === vm.whichState;
            });

            data.forEach(function(d) {
              d.date = parse_year(d.year);
              d.snow_mean = +d.snow_mean;
              d.temp_mean = +d.temp_mean;
              d.elev = d.elev + '000';
            });

            let circleSize = vm.circleRadius(data, sizing);
            let color = vm.colorScale(data);

            let elevations = _.pluck(_.uniq(data, 'elev'), 'elev');
            let xYearScale = vm.timeScale(data, 'date', vm.fullWidth() - 50 - margins.left - margins.right);
            let elevationScale = vm.ordinalScale(elevations, elevations.length * 45);

            let xYearAxis = d3.axisTop()
              .scale(xYearScale)
              .tickFormat(d3.timeFormat(type));

            let yYearAxis = d3.axisLeft()
              .scale(elevationScale)
              .tickFormat(d3.format(',d'));

            svg_year.append('g')
              .attr("class", "axis x")
              .attr('transform', `translate(${margins.left}, ${margins.top})`);

            d3.select("#snow g.x").call(xYearAxis);

            svg_year.append('g')
              .attr('class', 'axis y')
              .attr('transform', `translate(${margins.left - 25}, ${margins.top})`);

            d3.select('#snow g.y').call(yYearAxis);

            let circles = svg_year.selectAll('circle').data(data);

            circles.enter().append('circle')
              .merge(circles)
              .attr('transform', `translate(${margins.left}, ${margins.top})`)
              .style('fill', function(d) {
                return color(d.temp_mean);
              })
              .attr('cx', function(d) { return xYearScale(d.date); })
              .attr('cy', function(d) { return elevationScale(d.elev); })
              .attr('r', function(d) {
                return circleSize(d.snow_mean);
              })
              .on('mouseover touchstart', function(d) {
                tip_div.transition()
                  .duration(100)
                  .style('opacity', .9);

                tip_div.html(
                  `<h4 class="text-center">${d.date.getFullYear()}</h4>
                   <h5  class="text-center">Snow/Water Equivalence</h5>
                   <ul class="list-unstyled">
                   <li>Elevation: ${num_format(d.elev)}+ feet</li>
                   <li>Temp Mean: ${d.temp_mean} degrees</li>
                   <li>Water Mean: ${d.snow_mean} inches</li>
                   <li>Water Median: ${d.snow_median} inches</li>
                   </ul>`
                )
                  .style('top', (d3.event.pageY+18)+'px')
                  .style('left', (d3.event.pageX-55)+'px');

                d3.select(this).attr('r', circleSize(d.snow_mean) * 1.3);
              })
              .on('mouseout touchend', function(d) {
                tip_div.transition()
                  .duration(250)
                  .style('opacity', 0);
                d3.select(this).attr('r', circleSize(d.snow_mean));
              });

            circles.exit().remove()
          });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
