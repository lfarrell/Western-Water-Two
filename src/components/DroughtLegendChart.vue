<template>
  <div id="drought_circle_legend" class="row color-legend offset">
    <div class="col-xs-12 offset-sm-2 col-sm-5 offset-lg-1 col-lg-5">
      <h3 class="droughty">Percentage of State at a Particular Drought Level</h3>
      <svg width="350" height="55" class="legend" transform="translate(35,0)">
        <text x="1" y="35" height="30" width="25">
          Smaller
        </text>
        <g width="350">
          <circle cx="60" cy="15" r="3" transform="translate(0,15)"/>
        </g>
        <g width="350">
          <circle cx="80" cy="15" r="8" transform="translate(0,15)"/>
        </g>
        <g width="350">
          <circle cx="110" cy="15" r="13" transform="translate(0,15)"/>
        </g>
        <g width="350">
          <circle cx="150" cy="15" r="18" transform="translate(0,15)"/>
        </g>
        <g width="350">
          <circle cx="200" cy="15" r="23" transform="translate(0,15)"/>
        </g>
        <text x="233" y="35" height="30" width="25">
          Greater
        </text>
      </svg>
    </div>
    <div class="col-xs-12 col-sm-4 col-lg-4">
      <h3 class="droughty">Interpreting the Drought Circles</h3>
      <svg width="325" height="100">
        <g class="color-legend" transform="translate(35,25)">
          <circle cx="50" cy="15" r="30"
                  style="stroke:rgb(255, 255, 212)"/>
          <circle cx="50" cy="15" r="25"
                  style="stroke:rgb(254, 217, 142)"/>
          <circle cx="50" cy="15" r="20"
                  style="stroke:rgb(254, 153, 41)"/>
          <circle cx="50" cy="15" r="15"
                  style="stroke:rgb(217, 95, 14)"/>
          <circle cx="50" cy="15" r="10"
                  style="stroke:rgb(153, 52, 4)"/>
        </g>
        <g class="annotations">
          <g transform="translate(125,100)">
            <text transform="translate(11,-85)">
              Abnormally Dry (D0)
            </text>
            <path d="M-30,-89L5,-89"/>
          </g>
          <g transform="translate(125,100)">
            <text transform="translate(11,-65)">
              Moderate Drought (D1)
            </text>
            <path d="M-18,-71L3,-71"/>
          </g>
          <g transform="translate(125,100)">
            <text transform="translate(11,-45)">
              Severe Drought (D2)
            </text>
            <path d="M-21,-61L3,-52"/>
          </g>
          <g transform="translate(125,100)">
            <text transform="translate(11,-25)">
              Extreme Drought (D3)
            </text>
            <path d="M-26,-56L4,-34"/>
          </g>
          <g transform="translate(125,100)">
            <text transform="translate(11,-5)">
              Exceptional Drought (D4)
            </text>
            <path d="M-36,-51L5,-14"/>
          </g>
        </g>
      </svg>
    </div>
    <div class="col-sm-12 col-lg-12">
      <h3 class="droughty text-center offset">Drought Affects</h3>
      <div class="col-xs-12 offset-sm-3 col-sm-9 offset-lg-3 col-lg-8">
        <p>The <a href="http://droughtmonitor.unl.edu/AboutUs/ClassificationScheme.aspx">United States Drought
          Monitor</a> defines the affects of various drought levels as follows:</p>
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
  </div>
</template>

<script>

  export default {
    name: 'DroughtLegendChart',
  }
</script>
