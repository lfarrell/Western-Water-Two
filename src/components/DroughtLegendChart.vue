<template>
  <div id="drought_circle_legend" class="row color-legend offset">
    <div class="col-sm-12 col-lg-4">
      <svg width="325" height="100">
        <g transform="translate(35,25)">
          <template v-for="(d, index) in radii">
            <circle
                cx="50"
                cy="15"
                :r="d"
                :style="{stroke:colors[index]}"></circle>
          </template>
        </g>
      </svg>
    </div>
    <div class="col-sm-12 col-lg-8">
      <h3 class="droughty">Drought Affects</h3>
      <p>The <a href="http://droughtmonitor.unl.edu/AboutUs/ClassificationScheme.aspx">United States Drought Monitor</a> defines the affects of various drought levels as follows:</p>
      <ul class="list-unstyled">
        <li>DO
          <ul>
            <li>Short-term dryness slowing planting, growth of crops or pastures</li>
          </ul>
        </li>
        <li>D1
          <ul>
            <li>Some damage to crops, pastures</li>
            <li>Streams, reservoirs, or wells low, some water shortages developing or imminent</li>
            <li> Voluntary water-use restrictions requested</li>
          </ul>
        </li>
        <li>D2
          <ul>
            <li>Crop or pasture losses likely</li>
            <li>Water shortages common</li>
            <li>Water restrictions imposed</li>
          </ul>
        </li>
        <li>D3
          <ul>
            <li>Major crop/pasture losses</li>
            <li>Widespread water shortages or restrictions</li>
          </ul>
        </li>
        <li>D4
          <ul>
            <li>Exceptional and widespread crop/pasture losses</li>
            <li>Shortages of water in reservoirs, streams, and wells creating water emergencies</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as _ from 'lodash';

  export default {
    name: 'DroughtLegendChart',

    data() {
      return {
        radii: _.range(15, 40, 5).reverse()
      }
    },

    props: {
      colors: Array
    },
  }
</script>
