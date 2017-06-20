<template>
  <div v-show="done" class="col-sm-12 col-lg-12" id="drought-strip">
    <h3 class="text-center">Drought Level</h3>
    <h4 class="text-center">Departure from Average (Anomaly from Avg Palmer Value)</h4>
    <legend-chart :colors="colors"
                  :dataValues="dataValues"
                  :field="legend_field"></legend-chart>
    <svg id="strip" height="110" :width="width_large">
      <template v-for="d in data">
        <rect :x="scale(d.date)" y="0"
              :height="height"
              :width="barWidth"
              :fill="stripColor(d.anomaly)"
              :transform="offset"
              @mouseover="showItem(d, tipDiv, $event)"
              @mouseout="hideItem(tipDiv, $event)"
              @touchstart="showItem(d, tipDiv, $event)"
              @touchend="hideItem(tipDiv, $event)"></rect>
      </template>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as _ from 'lodash';
  import LegendChart from './LegendChart.vue';
  import {tip} from './utilities/tip';

  const margins = { top: 20, right: 50, left: 75, bottom: 75 };

  export default {
    name: 'StripChart',

    data() {
      return {
        data: [],
        height: 80,
        width: window.innerWidth - 100 - margins.left - margins.right,
        width_large: window.innerWidth + margins.left + margins.right,
        offset: `translate(${margins.left},0)`,
        scale: {},
        colors: ['#543005','#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5',
          '#c7eae5','#80cdc1','#35978f','#01665e','#003c30'],
        stripColor: {},
        barWidth: '',
        avgVals: [],
        tipDiv: tip,
        done: false,
        legend_field: 'anomaly'
      }
    },

    props: {
      stateFile: String,
      dataValues: Array
    },

    computed: {
      dataValues: function () {
        return this.data;
      }
    },

    components: {
      LegendChart: LegendChart
    },

    methods: {
      xScale() {
        let scale = d3.scaleTime()
          .range([0, this.width]);
        scale.domain(d3.extent(this.data, (d) => { return d.date; }));

        return scale;
      },

      showItem(data, tip, event) {
        let formatting = d3.format('.01f');
        d3.select(event.target).attr('height', 100);

        let template = `
                <h4 class="text-center">${this.stringDate(data.month)}, ${data.year}</h4>
                <ul class="list-unstyled"
                  <li>Historical Avg: ${this.monthAvg(this.avgVals, 'drought', data.month)}</li>
                  <li>Actual Avg: ${formatting(data.value)}</li>
                  <li>Departure from Avg: ${formatting(data.anomaly)}</li>
                </ul>`;

         tip.tipShow(tip.tipDiv(), template, event);
      },

      hideItem(tip, event) {
        d3.select(event.target).attr('height', 80);
        tip.tipHide(tip.tipDiv());
      },

      stripColors() {
        return d3.scaleQuantile()
          .domain(d3.extent(this.data, (d) => { return +d.anomaly; }))
          .range(this.colors);
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

      barsWidth() {
        return _.floor(this.width / this.data.length, 3);
      },

      draw() {
        let vm = this;

        d3.csv(`static/data/palmer/${this.stateFile}`, function(datas) {
          let parse_date = d3.timeParse('%m/%Y');

          datas.forEach((d) => {
            d.date = parse_date(`${d.month}/${d.year}`)
          });
          let sorted_data = _.sortByOrder(datas, ['year', 'month']);

          vm.data = sorted_data;
          vm.scale = vm.xScale();
          vm.stripColor = vm.stripColors();
          vm.barWidth = vm.barsWidth();
          vm.avgVals = vm.avgValues(sorted_data);
          vm.barWidth = vm.barsWidth();
          vm.done = true;
        });
      }
    },

    mounted() {
      this.draw();
    }
  }
</script>
